import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAirtableRecords,
  PrintServiceAirtable,
} from '../../../utils/airtable';

const getPrintQueue = async (_req: NextApiRequest, res: NextApiResponse) => {
  const PrintServiceQueue = await getAirtableRecords(PrintServiceAirtable);

  if (!PrintServiceQueue) {
    res.status(422).json({
      statusCode: 422,
      message: 'Print queue unavailable at the moment',
    });
    return;
  }

  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, stale-while-revalidate, s-maxage=60, max-age=45`,
  );
  res.status(200).json({
    statusCode: 200,
    records: PrintServiceQueue,
  });
};

export default getPrintQueue;
