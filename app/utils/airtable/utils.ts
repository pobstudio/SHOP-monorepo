import { FieldSet, Records } from 'airtable';
import { AirtableData } from '.';
import { PrintServiceAirtableRecordType } from './print-service';

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

export const removeAirtableRecord = async (
  airtable: AirtableData,
  id: string,
) => {
  const { base, table } = airtable;
  return await new Promise((resolve, reject) => {
    base(table).destroy(id, (err, _deletedRecord) => {
      if (err) {
        console.error(err);
        return reject(false);
      }
      return resolve(true);
    });
  });
};
