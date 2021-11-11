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
              <PageSubheader>Order Issues</PageSubheader>
              <PageText>
                1. Join the official POB Discord:{' '}
                <a
                  href={`https://discord.gg/pob`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  discord.gg/pob
                </a>
                <br />
                2. Follow the necessary steps to view all channels in the
                General section.
                <br />
                3. In the #support channel, please use the
                <a
                  href="https://discord.com/channels/797978413691305995/798782663313195020/874358061840601098"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Support bot
                </a>{' '}
                and file a ticket.
                <br />
                4. Include as much information as possible like your payment's
                transaction id, the info you used during checkout, the link to
                your artwork, your Twitter or Discord handle etc.
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Shipping Information</PageSubheader>
              <PageText>
                All orders include free international delivery. Please use an
                address that you are confident will register in{' '}
                <a
                  href="https://www.fedex.com/en-us/online/rating.html#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FedEx
                </a>
                . Shipping a framed piece requires meticulously wrapping the
                frame and packing everything graciously for transport; this is
                very expensive. Paper only orders are shipped in hard, plastic
                canisters and are much easier overall to process.
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Contact Us</PageSubheader>
              <PageText>
                <a
                  href={`mailto:team@pob.studio`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>{' '}
                <a
                  href={`https://twitter.com/prrfbeauty`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>{' '}
                <a
                  href={`https://discord.gg/pob`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>{' '}
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
