import { PrintServiceProductType } from '../utils/airtable';

// SHOP: Print Service
export const FIRESTORE_PRINT_SERVICE_NEW_ORDERS_COLLECTION =
  'print-service/orders/new';
export const FIRESTORE_PRINT_SERVICE_PAID_ORDERS_COLLECTION =
  'print-service/orders/paid';

export interface FIRESTORE_PRINT_SERVICE_RECORD {
  artworkName?: string;
  artworkUrl?: string;
  collectionContract: string;
  collectionName?: string;
  customerContact: string;
  customerShipping: string;
  customerWallet?: string | null;
  paymentUrl?: string;
  productType: PrintServiceProductType;
  status: 'pending' | 'paid';
  timestamp: Date;
  tokenId: string;
}
