import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { ALCHEMY_KEY, CHAIN_ID } from '../constants';

export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID],
});

const RPC_URLS: { [chainId: number]: string } = {
  [CHAIN_ID]: `https://eth-${
    CHAIN_ID === 1 ? 'mainnet' : 'rinkeby'
  }.alchemyapi.io/v2/${ALCHEMY_KEY}`,
};

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'SHOP by POB',
});
