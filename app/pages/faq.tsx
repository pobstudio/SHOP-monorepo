import React from 'react';
import { NextPage } from 'next';
import { ContentWrapper, MainContent } from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ROUTES } from '../constants/routes';
import Link from 'next/link';
import {
  PageTitle,
  PageCaption,
  PageBody,
  PageSubheader,
  PageText,
  PageBodySection,
} from '../components/common';
import { PRINT_SERVICE_BLOG_POST, TRADE_LONDON_LINK } from '../constants';
import { deployments } from '@pob/protocol';

const FaqPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <br />
          <br />
          <PageTitle>FAQ</PageTitle>
          <PageBody>
            <PageBodySection>
              <PageSubheader>Learn More</PageSubheader>
              <PageText>
                <a
                  href={PRINT_SERVICE_BLOG_POST}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Print Service Grand Opening Blog Post
                </a>
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Get $LONDON</PageSubheader>
              <PageText>
                <a
                  href={TRADE_LONDON_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy $LONDON via Matcha.xyz
                </a>
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Can I print other art?</PageSubheader>
              <PageText>
                Not just yet. We will work on expanding to other artists
                eventually. Tweet at us and your favorite collection to gauge
                interest. We would love to grow the Print Service.
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Can I print in other sizes?</PageSubheader>
              <PageText>
                To standardize how our art is displayed, we only provide 1 size
                for HASH and LONDON GIFT respectively. If you think we should
                provide multiple sizes, please contact us or tweet at us.
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Relevant Contracts / Tokens</PageSubheader>
              <PageText>
                <a
                  href={`https://etherscan.io/token/${deployments[1].london}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  $LONDON token
                </a>
                <br />
                <a
                  href={`https://etherscan.io/token/${deployments[1].poster}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  $POSTER token
                </a>
                <br />
                <a
                  href={`https://etherscan.io/address/${deployments[1].printServiceV2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PrintServiceV2 contract (current)
                </a>
                <br />
                <a
                  href={`https://etherscan.io/address/${deployments[1].printService}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PrintServiceV1 contract
                </a>
                <br />
              </PageText>
            </PageBodySection>
          </PageBody>

          <PageCaption>
            <Link href={ROUTES.SUPPORT} passHref>
              <a>Support</a>
            </Link>
          </PageCaption>
          <br />
          <br />
        </MainContent>
        <Footer />
      </ContentWrapper>
    </>
  );
};

export default React.memo(FaqPage);
