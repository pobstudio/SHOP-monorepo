import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import {
  BetweenContentAndFooterSpacer,
  ContentWrapper,
  MainContent,
} from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ROUTES } from '../constants/routes';
import Link from 'next/link';
import Arrow from '../components/icons/arrow';

const IndexPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <Pages>
            <Link href={ROUTES.PRINT} passHref>
              <PageButton>
                <h1>Official Print Service</h1>
                <p>
                  Select any Proof of Beauty artwork you own to print. All
                  prints cost $LONDON token.
                  <br />
                  Enter your Contact Info and Shipping Address to complete
                  purchase.
                </p>
                <Arrow />
              </PageButton>
            </Link>
          </Pages>
        </MainContent>
        <BetweenContentAndFooterSpacer />
        <Footer />
      </ContentWrapper>
    </>
  );
};

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;

const PageButton = styled.a`
  position: relative;
  width: fit-content;
  min-width: ${256 * 3}px;
  padding: 32px 40px;
  border: 1px solid black;
  text-decoration: none;
  color: unset;

  h1 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    text-transform: uppercase;
  }
  p {
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
  }
  svg {
    position: absolute;
    top: 32px;
    right: 32px;
    pointer-events: none;
  }
`;

export default React.memo(IndexPage);
