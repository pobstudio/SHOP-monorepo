import Airtable from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { AIRTABLE_API_KEY } from '../../constants';

export * from './utils';
export * from './print-service';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});

const SHOP_BASE_ID = 'appt7VsIrP00ndon6';
export const ShopBase = Airtable.base(SHOP_BASE_ID);

// BASE + TABLE CONFIGS
export interface AirtableData {
  base: AirtableBase;
  table: string;
  view: string;
}

export const PrintServiceAirtable: AirtableData = {
  base: ShopBase,
  table: 'print service',
  view: 'orders',
};
