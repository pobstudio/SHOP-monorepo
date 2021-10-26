// import { NextApiRequest, NextApiResponse } from 'next';
// import {
//   createAirtableRecord,
//   PrintServiceAirtable,
// } from '../../../utils/airtable';

// const createNewPrintOrder = async (
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) => {
//   if (req.method !== 'POST') {
//     res.status(400).json({ statusCode: 400, message: 'Bad Request' });
//     return;
//   }

//   const { payload } = req.body;

//   const success = await createAirtableRecord(PrintServiceAirtable, payload);

//   if (!success) {
//     res.status(422).json({
//       statusCode: 422,
//       message: `Failed to create new Print Order`,
//     });
//     return;
//   }

//   res.status(200).json({
//     statusCode: 200,
//     success: true,
//   });
// };

// export default createNewPrintOrder;
