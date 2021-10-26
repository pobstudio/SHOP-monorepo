import { AlchemyProvider } from '@ethersproject/providers';
import { ALCHEMY_KEY, CHAIN_ID, MAINNET_ALCHEMY_KEY } from '.';

export const PROVIDER = new AlchemyProvider(CHAIN_ID, ALCHEMY_KEY);

export const MAINNET_PROVIDER = new AlchemyProvider(1, MAINNET_ALCHEMY_KEY);
