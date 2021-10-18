import Airtable, { FieldSet, Records } from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { AIRTABLE_API_KEY } from '../constants';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});

export interface AirtableData {
  base: AirtableBase;
  table: string;
  view: string;
}

const SHOP_BASE_ID = 'appE14hHaCodzTThF';
const ShopBase = Airtable.base(SHOP_BASE_ID);

export const PrintServiceAirtable: AirtableData = {
  base: ShopBase,
  table: 'print service',
  view: 'orders',
};
export type PrintServiceOrderStatus =
  | 'new'
  | 'uploaded'
  | 'delayed'
  | 'printing'
  | 'framing'
  | 'shipped'
  | 'complete'
  | 'rejected';
export type PrintServiceOrderType = 'frame0' | 'frame1';
export type PrintServiceCollectionType = 'LONDON GIFT' | 'HASH';
export interface PrintServiceAirtableRecordType {
  'order id'?: string; // incremented number
  'created at'?: string;
  'wallet': string; // customer wallet address
  'tokenid'?: string; // artwork token id
  'name': string; //
  'collection': PrintServiceCollectionType; // artwork collection
  'opensea': string; // opensea asset url
  'contact': string; // customer contact
  'shipping': string; // customer shipping details
  'type': PrintServiceOrderType;
  'status'?: PrintServiceOrderStatus;
  'etherscan'?: string; // customer payment etherscan receipt
  'amount paid'?: number; // customer payment amount
  [key: string]: number | string | undefined; // for Partial<FieldSet> type compatibility
}

export const getAirtableRecords = async (airtable: AirtableData) => {
  const { base, table, view } = airtable;
  return await new Promise((resolve, reject) => {
    let results: Records<FieldSet>[] = [];
    base(table)
      .select({
        // maxRecords: 999,
        view,
      })
      .eachPage(
        (records, fetchNextPage) => {
          results.push(records);
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error(err);
            return reject(results.flat());
          }
          return resolve(results.flat());
        },
      );
  });
};

export const createAirtableRecord = async (
  airtable: AirtableData,
  entry: PrintServiceAirtableRecordType | Partial<FieldSet>,
) => {
  const { base, table } = airtable;
  return await new Promise((resolve, reject) => {
    base(table).create(entry, (err, _record) => {
      if (err) {
        console.error(err);
        return reject(false);
      }
      return resolve(true);
    });
  });
};

export const updateAirtableRecord = async (
  airtable: AirtableData,
  targetID: string,
  payload: PrintServiceAirtableRecordType | Partial<FieldSet>,
) => {
  const { base, table } = airtable;
  return await new Promise((resolve, reject) => {
    base(table).update(targetID, payload, (err, _record) => {
      if (err) {
        console.error(err);
        return reject(false);
      }
      return resolve(true);
    });
  });
};

// DISABLED FOR SAFETY

// export const removeAirtableRecord = async (
//   airtable: AirtableData,
//   id: string,
// ) => {
//   const { base, table } = airtable;
//   return await new Promise((resolve, reject) => {
//     base(table).destroy(id, (err, _deletedRecord) => {
//       if (err) {
//         console.error(err);
//         return reject(false);
//       }
//       return resolve(true);
//     });
//   });
// };
