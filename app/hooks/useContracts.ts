import {
  deployments,
  ERC20Mintable__factory,
  PrintServiceV2__factory,
} from '@pob/protocol';
import { useMemo } from 'react';
import { CHAIN_ID } from '../constants';
import { getProviderOrSigner } from '../utils/provider';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useProvider } from './useProvider';
import { useWeb3React } from '@web3-react/core';
import { useCheckoutStore } from '../stores/checkout';
import { BigNumberish } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';

export const useLondonContract = (shouldUseFallback: boolean = false) => {
  const { account } = useWeb3React();
  const provider = useProvider(shouldUseFallback);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    return ERC20Mintable__factory.connect(
      deployments[CHAIN_ID].london,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, provider]);
};

export const usePrintServiceContract = (shouldUseFallback: boolean = false) => {
  const { account } = useWeb3React();
  const provider = useProvider(shouldUseFallback);
  const paymentCurrency = useCheckoutStore((s) => s.paymentCurrency);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    return PrintServiceV2__factory.connect(
      deployments[CHAIN_ID].printServiceV2,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, provider, paymentCurrency]);
};
