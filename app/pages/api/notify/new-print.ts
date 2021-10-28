import { deployments, PrintService__factory } from '@pob/protocol';
import { NextApiRequest, NextApiResponse } from 'next';
import { CHAIN_ID } from '../../../constants';
import { PROVIDER } from '../../../constants/providers';

const printServiceContract = PrintService__factory.connect(
  deployments[CHAIN_ID].printService,
  PROVIDER,
);

const PrintOrderReceivedTopic0 =
  CHAIN_ID === 1
    ? ''
    : '0x683b8e58d3b4c62460d6e6df4524f97da8c68e6fce307d96b224461ca40b6869';

const handleNotify = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const activity = body?.activity;

  if (!activity || activity?.length < 1) {
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
  }));
  const transactionIds = tokenTransferActivity.map((a: any) => a.hash);
  for (const txid of transactionIds) {
    // GET TRANSACTION DATA FROM TXID
    const receipt = await PROVIDER.getTransactionReceipt(txid);
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

    const tokenIds = printOrdersReceived.map(
      (l) =>
        printServiceContract.interface.decodeEventLog(
          'PrintOrderReceived',
          l.data,
        )[4],
    );
    console.log(tokenIds, 'tokenIds');

    // INDEX FIREBASE W/ HASH, GRAB DATA => PUSH AIRTABLE RECORD + EMIT EMAIL
  }

  res.status(200).json({
    statusCode: 200,
  });
};

export default handleNotify;
