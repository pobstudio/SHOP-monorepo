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

  console.log(activity, 'activity');

  const tokenTransferActivity = activity.filter(
    (a: any) => a.category === 'token' && a.asset === 'LONDON',
  );
  const transactionIds = tokenTransferActivity.map((a: any) => a.hash);

  for (const txid of transactionIds) {
    const receipt = await PROVIDER.getTransactionReceipt(txid);
    console.log(receipt.logs, 'receipt.logs');
    const printOrdersReceived = receipt.logs.filter(
      (l) => l.topics[0] === PrintOrderReceivedTopic0,
    );
    console.log(printOrdersReceived, 'printOrdersReceived');

    const orderIds = printOrdersReceived
      .map((l) => l.topics[1])
      .map((m) => m.slice(-40));

    console.log(orderIds, 'orderIds');

    const orderHashes = printOrdersReceived.map((l) => l.topics[2]);

    console.log(orderHashes, 'orderHashes');

    const productTypes = printOrdersReceived
      .map(
        (l) =>
          printServiceContract.interface.decodeEventLog(
            'PrintOrderReceived',
            l.data,
          )[3],
      )
      .map((m) => parseInt(m, 16));

    console.log(productTypes, 'productTypes');

    const collectionContracts = printOrdersReceived.map(
      (l) =>
        printServiceContract.interface.decodeEventLog(
          'PrintOrderReceived',
          l.data,
        )[4],
    );

    console.log(collectionContracts, 'collectionContracts');

    const tokenIds = printOrdersReceived
      .map(
        (l) =>
          printServiceContract.interface.decodeEventLog(
            'PrintOrderReceived',
            l.data,
          )[5],
      )
      .map((m) => parseInt(m, 16));

    console.log(tokenIds, 'tokenIds');
  }
  res.status(200).json({
    statusCode: 200,
  });
};

export default handleNotify;
