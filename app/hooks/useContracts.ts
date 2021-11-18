import {
  deployments,
  ERC20Mintable__factory,
  PrintService__factory,
  PrintServiceEth__factory,
} from '@pob/protocol';
import { useMemo } from 'react';
import { CHAIN_ID } from '../constants';
import { getProviderOrSigner } from '../utils/provider';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useProvider } from './useProvider';
import { useWeb3React } from '@web3-react/core';
import { useCheckoutStore } from '../stores/checkout';
import { CHECKOUT_PAYMENT_CONFIG } from '../components/checkout/print/payment';

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

export const usePrintServiceContract = (shouldUseFallback: boolean = false) => {
  const { account } = useWeb3React();
  const provider = useProvider(shouldUseFallback);
  const paymentCurrency = useCheckoutStore((s) => s.paymentCurrency);

  return useMemo(() => {
    if (!account && !provider) {
      return;
    }

    if (paymentCurrency.toLowerCase().includes('london')) {
      return PrintService__factory.connect(
        deployments[CHAIN_ID].printService,
        getProviderOrSigner(provider as JsonRpcProvider, account as string),
      );
    }
    return PrintServiceEth__factory.connect(
      deployments[CHAIN_ID].printServiceEth,
      getProviderOrSigner(provider as JsonRpcProvider, account as string),
    );
  }, [account, provider, paymentCurrency]);
};
