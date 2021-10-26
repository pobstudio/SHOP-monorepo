import { NextApiRequest, NextApiResponse } from 'next';
import { FIRESTORE_PRINT_SERVICE_NEW_ORDERS_COLLECTION } from '../../clients/firebase';
import { admin } from '../../clients/firebase-server';

const firestore = admin.firestore();

const handleCreateNewPrintOrder = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST') {
    res.status(400).json({ statusCode: 400, message: 'Bad Request' });
    return;
  }

  const { hash, record } = req.body;

  if (typeof hash !== 'string') {
    res
      .status(422)
      .json({ statusCode: 422, message: 'Hash is not a valid value' });
    return;
  }

  if (
    !record.customerContact ||
    !record.customerShipping ||
    !record.customerWallet ||
    !record.tokenId
  ) {
    res
      .status(422)
      .json({ statusCode: 422, message: 'Record was missing values' });
    return;
  }

  try {
    const printServiceNewOrdersCollectionRef = firestore
      .collection(FIRESTORE_PRINT_SERVICE_NEW_ORDERS_COLLECTION)
      .doc(`${hash}`);
    await printServiceNewOrdersCollectionRef.set(record);
    res.status(200).json({ hash, record });
  } catch (e) {
    console.log(e);
    res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
  }
};

export default handleCreateNewPrintOrder;
