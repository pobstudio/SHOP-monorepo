import { BigNumber, utils } from 'ethers';

export const NETWORK_NAME_CHAIN_ID: { [name: string]: number } = {
  mainnet: 1,
  rinkeby: 4,
  hardhat: 1337,
};

export const ETH_IN_WEI = BigNumber.from('1000000000000000000');

export const ONE_TOKEN_IN_BASE_UNITS = utils.parseEther('1');

export const POSTER_CHECKOUT_PRODUCTS = [
  {
    id: 'frame0',
    price: ONE_TOKEN_IN_BASE_UNITS.mul(10000),
    inStock: true,
  },
  {
    id: 'frame1',
    price: ONE_TOKEN_IN_BASE_UNITS.mul(30000),
    inStock: true,
  },
];
