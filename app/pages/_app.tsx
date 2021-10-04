import React from 'react';
import App from 'next/app';
import { ThemedGlobalStyle } from '../theme';
import { LocalStorageEffect } from '../effects/LocalStorageEffect';
import { BlockchainEffect } from '../effects/BlockchainEffect';
import { EagerConnectEffect } from '../effects/EagerConnectEffect';
import { TokensEffect } from '../effects/TokensEffect';
import { TransactionsEffect } from '../effects/TransactionsEffect';
import { useModalStore } from '../stores/modal';
import { ToastsEffect } from '../effects/ToastEffect';
import { WalletEffect } from '../effects/WalletEffect';
import { DefaultSeo } from 'next-seo';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { AppProvider } from '../contexts/app';
import { ApolloProvider } from '@apollo/client';
// import { subgraphClient } from '../clients/graph';
import { PROD_LINK, SEO_TITLE, SEO_DESCRIPTION, OG_BANNER } from '../constants';

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
};

export default class PobApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const { err } = this.props as any;
    const modifiedPageProps = { ...pageProps, err };
    return (
      <>
        <DefaultSeo
          title={SEO_TITLE}
          description={SEO_DESCRIPTION}
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: PROD_LINK,
            title: SEO_TITLE,
            description: SEO_DESCRIPTION,
            site_name: 'POB',
            images: [
              {
                url: OG_BANNER,
                // width: 800,
                // height: 418,
                alt: 'POB',
              },
            ],
          }}
          twitter={{
            handle: '@prrfbeauty',
            site: '@prrfbeauty',
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={[
            {
              name: 'twitter:image',
              content: OG_BANNER,
            },
            {
              name: 'twitter:url',
              content: PROD_LINK,
            },
          ]}
        />
        <ThemedGlobalStyle />
        <AppProvider>
          {/* <ApolloProvider client={subgraphClient}> */}
          <Web3ReactProvider getLibrary={getLibrary}>
            {/** Effects are any tasks that strictly only makes state changes to stores */}
            <LocalStorageEffect />
            <BlockchainEffect />
            <EagerConnectEffect />
            <TokensEffect />
            <TransactionsEffect />
            <WalletEffect />
            <ToastsEffect />
            <Component {...modifiedPageProps} />
          </Web3ReactProvider>
          {/* </ApolloProvider> */}
        </AppProvider>
      </>
    );
  }
}
