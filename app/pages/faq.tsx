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
                for HASH and LONDON GIFT respectively.
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
