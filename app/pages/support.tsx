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

const SupportPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <br />
          <br />
          <PageTitle>Support</PageTitle>
          <PageBody>
            <PageBodySection>
              <PageSubheader>File a Support Ticket</PageSubheader>
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
                transaction number, the info you used during checkout, the link
                to your artwork, your Twitter or Discord handle, etc.
                <br />
                5. We will get back to you as soon as possible. Additionally,
                feel free to contact us on a platform of your choice (email
                preferably) to communicate private or sensitive info. While we
                respect everyone's privacy, please bear with us as we figure out
                how to ship everything accurately and securely.
              </PageText>
            </PageBodySection>

            <PageBodySection>
              <PageSubheader>Shipping Information</PageSubheader>
              <PageText>
                If you leave the Shipping portion of checkout blank or feel
                uncomfortable sharing an address through the website, please
                contact us through a means of your choice to exchange this
                information. Please provide your order details as well.
                <br />
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
              <PageSubheader>Privacy</PageSubheader>
              <PageText>
                We deeply respect everyone's privacy and handle all sensitive
                info as securely as possible. Shipping info is shared with our
                printing service Gallery 16 and stored in both a restricted
                Firestore database and Airtable. The POB Shop experience is both
                experimental and a work in progress; please be advised. The
                primary parties responsible over your data are{' '}
                <a
                  href={`https://twitter.com/ash_bhimasani`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @ash_bhimasani
                </a>{' '}
                and{' '}
                <a
                  href={`https://twitter.com/dave4506`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @dave4506
                </a>
                . Feel free to reach out to us anytime.
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
            <Link href={ROUTES.FAQ} passHref>
              <a>FAQ</a>
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

export default React.memo(SupportPage);
