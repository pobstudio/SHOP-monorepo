import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { ContentWrapper, MainContent } from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ROUTES } from '../constants/routes';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <CenterOnPage background={`#991616`}>
          {/* <FrameOutline /> */}
          <Link href={ROUTES.PRINT} passHref>
            <SmallWhiteButton>Print Service</SmallWhiteButton>
          </Link>
        </CenterOnPage>
        <Footer />
      </ContentWrapper>
    </>
  );
};

const CenterOnPage = styled(MainContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid black;
`;

const FrameOutline = styled.div`
  min-width: 256px;
  width: 24vw;
  height: 64vh;
  background: transparent;
  border: 2px solid black;
  position: absolute;
  z-index: 0;
`;

const SmallWhiteButton = styled.a`
  position: relative;
  z-index: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 32px;
  padding: 0 20px;
  border-radius: 999px;
  background-color: white;
  border: 1px solid black;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  &:hover {
    color: #991616;
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 64px;
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
