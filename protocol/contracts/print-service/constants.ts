import { BigNumber } from 'ethers';
import { ONE_TOKEN_IN_BASE_UNITS } from '../../utils';
import { PrintServiceProductType } from '../../../app/utils/airtable';

interface PrintServiceProductContractType {
  id: PrintServiceProductType;
  price: BigNumber;
  inStock: boolean;
}

export const PRINT_SERVICE_PRODUCTS: PrintServiceProductContractType[] = [
  {
    id: 'print0',
    price: ONE_TOKEN_IN_BASE_UNITS.mul(10000),
    inStock: true,
  },
  {
    id: 'print1',
    price: ONE_TOKEN_IN_BASE_UNITS.mul(30000),
    inStock: true,
  },
];

export const PRINT_SERVICE_PRODUCTS_TEST: PrintServiceProductContractType[] = [
  {
    id: 'print0',
    price: ONE_TOKEN_IN_BASE_UNITS.mul(1),
    inStock: true,
  },
  {
    id: 'print1',
    price: ONE_TOKEN_IN_BASE_UNITS.mul(2),
    inStock: true,
  },
];
