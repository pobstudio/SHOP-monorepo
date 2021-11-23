import { HASH_CONTRACT, LONDON_GIFT_CONTRACT } from '../../constants';

export type PrintServiceOrderStatus =
  | 'new'
  | 'uploaded'
  | 'delayed'
  | 'printing'
  | 'framing'
  | 'shipped'
  | 'complete'
  | 'rejected';
export type PrintServiceProductType = 'print0' | 'print1';
export type PrintServiceCollectionRawType = 'london-gifts' | 'hash';
export const getPrintServicePackageNameFromProductType: {
  [index in PrintServiceProductType]: string;
} = {
  print0: 'Print Only',
  print1: 'Framed',
};
export type PrintServiceCollectionType = 'LONDON GIFT' | 'HASH';
export const getPrintServiceCollectionTypeFromAddress: {
  [index: string]: PrintServiceCollectionType;
} = {
  [LONDON_GIFT_CONTRACT.toLowerCase()]: 'LONDON GIFT',
  [HASH_CONTRACT.toLowerCase()]: 'HASH',
};
export interface PrintServiceAirtableRecordType {
  'order id'?: string; // on chain id
  'order count'?: string; // queue id
  'created at'?: string;
  'last modified'?: string;
  'google drive'?: string;
  'wallet': string; // customer wallet address
  'tokenid'?: string; // artwork token id
  'name'?: string; // artwork name
  'collection': PrintServiceCollectionType; // artwork collection
  'opensea': string; // opensea asset url
  'contact': string; // customer contact
  'shipping': string; // customer shipping details
  'type': PrintServiceProductType;
  'status'?: PrintServiceOrderStatus;
  'etherscan'?: string; // customer payment etherscan receipt
  'tracking'?: string; // customer payment etherscan receipt
  'amount paid'?: string; // customer payment amount
  'order hash'?: string;
  [key: string]: number | string | undefined; // for Partial<FieldSet> type compatibility
}
