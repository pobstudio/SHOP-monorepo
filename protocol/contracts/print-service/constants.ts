import { BigNumber, utils } from 'ethers';
import { ONE_TOKEN_IN_BASE_UNITS } from '../../utils';
import { PrintServiceProductType } from '../../../app/utils/airtable';
import { deployments } from '../../deployments';

export interface PrintServiceProductContractType {
  id: PrintServiceProductType;
  price: BigNumber;
  inStock: boolean;
}

export const PRINT_SERVICE_CURRENCY_CONFIG = (chainId: 1 | 4) => ({
  eth: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  london: deployments[chainId].erc20,
});

export const PRINT_SERVICE_CONFIG = (
  chainId: 1 | 4,
): {
  [currency: string]: { [product: number]: PrintServiceProductContractType };
} => ({
  [PRINT_SERVICE_CURRENCY_CONFIG(chainId).eth]: {
    0: {
      id: 'print0',
      price: utils.parseEther('0.08'),
      inStock: true,
    },
    1: {
      id: 'print1',
      price: utils.parseEther('0.24'),
      inStock: true,
    },
  },
  [PRINT_SERVICE_CURRENCY_CONFIG(chainId).london]: {
    0: {
      id: 'print0',
      price: ONE_TOKEN_IN_BASE_UNITS.mul(chainId == 1 ? 10000 : 1),
      inStock: true,
    },
    1: {
      id: 'print1',
      price: ONE_TOKEN_IN_BASE_UNITS.mul(chainId == 1 ? 30000 : 3),
      inStock: true,
    },
  },
});

// OLD SHIT
export const PRINT_SERVICE_ETH_PRODUCTS: PrintServiceProductContractType[] = [
  {
    id: 'print0',
    price: utils.parseEther('0.08'),
    inStock: true,
  },
  {
    id: 'print1',
    price: utils.parseEther('0.24'),
    inStock: true,
  },
];

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
