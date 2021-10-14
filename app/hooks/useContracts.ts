import {
  deployments,
  ERC20Mintable__factory,
  PosterCheckout__factory,
} from '@pob/protocol';
import { useMemo } from 'react';
import { CHAIN_ID } from '../constants';
import { getProviderOrSigner } from '../utils/provider';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useProvider } from './useProvider';
import { useWeb3React } from '@web3-react/core';

export const useLondonContract = (shouldUseFallback: boolean = false) => {
  const { account } = useWeb3React();
  const provider = useProvider(shouldUseFallback);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    return ERC20Mintable__factory.connect(
      deployments[CHAIN_ID].erc20,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, provider]);
};

export const usePosterCheckoutContract = (
  shouldUseFallback: boolean = false,
) => {
  const { account } = useWeb3React();
  const provider = useProvider(shouldUseFallback);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    return PosterCheckout__factory.connect(
      deployments[CHAIN_ID].poster,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, provider]);
};
