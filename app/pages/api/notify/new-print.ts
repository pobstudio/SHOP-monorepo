import { deployments, PrintService__factory } from '@pob/protocol';
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { CHAIN_ID } from '../../../constants';
import { PROVIDER } from '../../../constants/providers';
import { getEtherscanTxUrl } from '../../../utils/urls';
import { admin } from '../../../clients/firebase-server';
import {
  FIRESTORE_PRINT_SERVICE_NEW_ORDERS_COLLECTION,
  FIRESTORE_PRINT_SERVICE_PAID_ORDERS_COLLECTION,
  FIRESTORE_PRINT_SERVICE_RECORD,
} from '../../../clients/firebase';
import {
  createAirtableRecord,
  getPrintServiceCollectionTypeFromAddress,
  PrintServiceAirtable,
} from '../../../utils/airtable';
import { PRINT_SERVICE_PRODUCTS } from '@pob/protocol/contracts/print-service/constants';

const printServiceContract = PrintService__factory.connect(
  deployments[CHAIN_ID].printService,
  PROVIDER,
);

const firestore = admin.firestore();

const PrintOrderReceivedTopic0 =
  CHAIN_ID === 1
    ? ''
    : '0x683b8e58d3b4c62460d6e6df4524f97da8c68e6fce307d96b224461ca40b6869';

const handleNotify = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const activity = body?.activity;

  if (!activity || activity?.length < 1) {
    console.log('Alchemy Notify: No Activity Found');
    res.status(200).json({
      statusCode: 200,
    });
    return;
  }

  // ARRAY OF SENDS/RECEIVE TXS
  const tokenTransferActivity = activity.map((a: any) => ({
    hash: a.hash,
    from: a.fromAddress,
    blockNum: a.blockNum,
    category: a.category,
    value: a.value,
    asset: a.asset,
  }));

  for (const [index, transaction] of tokenTransferActivity.entries()) {
    // GET TRANSACTION DATA FROM TXID
    const receipt = await PROVIDER.getTransactionReceipt(transaction.hash);
    console.log(receipt, 'receipt');

    const printOrdersReceived = receipt.logs.filter(
      (l) => l.topics[0] === PrintOrderReceivedTopic0,
    );
    console.log(printOrdersReceived, 'printOrdersReceived');

    // EXTRACT PRINT ORDER DETAILS (ORDER ID, ORDER HASH, ARTWORK COLLECTION, ARTWORK ID)
    const orderIds = printOrdersReceived
      .map((l) => l.topics[1])
      .map((m) => parseInt(m, 16));
    console.log(orderIds, 'orderIds');

    const orderHashes = printOrdersReceived.map((l) => l.topics[2]);
    console.log(orderHashes, 'orderHashes');

    const productTypes = printOrdersReceived
      .map(
        (l) =>
          printServiceContract.interface.decodeEventLog(
            'PrintOrderReceived',
            l.data,
          )[2],
      )
      .map((m) => parseInt(m, 16));
    console.log(productTypes, 'productTypes');

    const collectionContracts = printOrdersReceived.map(
      (l) =>
        printServiceContract.interface.decodeEventLog(
          'PrintOrderReceived',
          l.data,
        )[3],
    );
    console.log(collectionContracts, 'collectionContracts');

    const tokenIds = printOrdersReceived
      .map(
        (l) =>
          printServiceContract.interface.decodeEventLog(
            'PrintOrderReceived',
            l.data,
          )[4],
      )
      .map((m) => ethers.utils.formatUnits(m, 0));
    console.log(tokenIds, 'tokenIds');

    // LOOP ORDER IDS: INDEX FIREBASE W/ HASH, GRAB DATA => PUSH PAID FIREBASE + AIRTABLE RECORD + EMIT EMAIL
    for (const [orderIndex, orderId] of orderIds.entries()) {
      const orderHash = orderHashes[orderIndex];
      const productType = productTypes[orderIndex];
      const collectionContract = collectionContracts[orderIndex];
      const tokenId = tokenIds[orderIndex];
      const paymentUrl = getEtherscanTxUrl(transaction.hash);

      try {
        const newOrderRef = firestore
          .collection(FIRESTORE_PRINT_SERVICE_NEW_ORDERS_COLLECTION)
          .doc(orderHash);
        const paidOrderRef = firestore
          .collection(FIRESTORE_PRINT_SERVICE_PAID_ORDERS_COLLECTION)
          .doc(orderHash);

        await firestore.runTransaction(async (t) => {
          // GRAB ORDER DETAILS FROM 'NEW' FIREBASE COLLECTION
          const newOrderRes = await t.get(newOrderRef);
          const newOrderDetails =
            newOrderRes?.data() as FIRESTORE_PRINT_SERVICE_RECORD;
          if (!newOrderRes.exists || !newOrderDetails) {
            throw 'Document does not exist!';
          }

          // PUSH ORDER DETAILS TO 'PAID' FIREBASE COLLECTION
          await paidOrderRef.set({
            ...newOrderDetails,
            paymentUrl,
            orderId,
          });

          // PUSH ORDER DETAILS TO AIRTABLE
          await createAirtableRecord(PrintServiceAirtable, {
            'order id': orderId,
            'wallet': transaction.from,
            'tokenid': tokenId,
            'name': newOrderDetails.artworkName,
            'collection':
              getPrintServiceCollectionTypeFromAddress[
                collectionContract.toLowerCase()
              ],
            'opensea': newOrderDetails.artworkUrl,
            'contact': newOrderDetails.customerContact,
            'shipping': newOrderDetails.customerShipping,
            'type': PRINT_SERVICE_PRODUCTS[productType!]?.id,
            'status': CHAIN_ID === 1 ? 'new' : 'rejected',
            'etherscan': paymentUrl,
            'order hash': orderHash,
          });
        });
      } catch (e) {
        console.log(e);
        console.log('Failed to Check Order Details');
      }
    }
  }

  res.status(200).json({
    statusCode: 200,
  });
};

export default handleNotify;
