import React, { FC } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import {
  BetweenContentAndFooterSpacer,
  ContentWrapper,
  MainContent,
} from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const PrintPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <Split>
            <LeftSide>
              <img src="https://balenciaga.dam.kering.com/m/5e63dc1a91a9c5b9/Large-651795TKVF53660_F.jpg?v=3" />
              <img src="https://balenciaga.dam.kering.com/m/5e63dc1a91a9c5b9/Large-651795TKVF53660_F.jpg?v=3" />
            </LeftSide>
            <RightSide>
              <RightSection>
                <SectionBody>
                  <h1>Official POB Printmaking</h1>
                  <p>
                    Select any Proof of Beauty artwork you own to print. All
                    prints require $LONDON token to purchase. Enter your Contact
                    Info and Shipping Address to ensure delivery.
                    <br />
                    <br />
                    Shipping Information • FAQs • Get $LONDON
                  </p>
                </SectionBody>
              </RightSection>
              <RightSection>
                <Price>
                  0.02 ETH = 5000 $LONDON
                  <Slippage>Slippage 5%</Slippage>
                </Price>
              </RightSection>
              <PrintDetails />
            </RightSide>
          </Split>
        </MainContent>
        <BetweenContentAndFooterSpacer />
        <Footer />
      </ContentWrapper>
    </>
  );
};
export default React.memo(PrintPage);

const Split = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  overflow: scroll;
  width: 50vw;
  height: calc(100vh - 80px);
  img {
    width: 100%;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  overflow: scroll;
  width: 50vw;
  height: calc(100vh - 80px);
`;

const RightSection = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  &:last-child {
    border-bottom: none;
  }

  h1 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    color: #000000;
  }
  h3 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: #000000;
  }
  h4 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
  }
  p {
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #000000;
    ul {
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    a {
      text-decoration: none;
      color: unset;
      &:hover {
        color: blue;
      }
    }
  }
`;

const SectionBody = styled.div`
  display: block;
  padding: 32px 40px;
`;

const Price = styled.div`
  border-right: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 24px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #000000;
  position: relative;
`;
const Slippage = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 9px;
  font-weight: 400;
  color: black;
  opacity: 0.4;
`;

const PrintDetails: FC = () => (
  <RightSection>
    <SectionBody>
      <h3>Product Details</h3>
      <p>
        All prints are done on Hahnemühle Photo Rag 308g paper with
        archival-grade ink. Printed via a fine art 74 inch wide Roland Hi-Fi Jet
        Pro II.
        <br />
        <br />
        Framing Option: All framing is custom, handcrafted black metal. The
        paper is set with a slight elevation off the back to create a floating
        effect. 1 inch wide x 1 inch deep.
        <br />
        <br />
        $HASH Prints
        <ul>
          <li>Print Sizing: 18 inches x 24 inches ( 45.72 cm x 60.96 cm )</li>
          <li>Framed Size: 20 inches x 26 inches ( 50.8 cm x 66.04 cm )</li>
          <li>Paper: Hahnemühle Photo Rag 308g</li>
        </ul>
        <br />
        $LONDON GIFT Prints
        <ul>
          <li>
            Print Sizing: 24.55 inches x 24.55 inches ( 62.36 cm x 62.36 cm ){' '}
          </li>
          <li>
            Framed Size: 26.55 inches x 26.55 inches ( 67.44 cm x 67.44 cm )
          </li>{' '}
          <li>Paper: Hahnemühle Photo Rag 308g</li>
        </ul>
        <br />
        Printing via{' '}
        <a
          href="https://twitter.com/gallery16"
          target="_blank"
          rel="noopener noreferrer"
        >
          @gallery16
        </a>
        {' / '}
        <a
          href="https://www.urbandigitalcolor.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @UDC
        </a>
        {'. '}
        Framing via{' '}
        <a
          href="https://twitter.com/gallery16"
          target="_blank"
          rel="noopener noreferrer"
        >
          @gallery16
        </a>
      </p>
    </SectionBody>
  </RightSection>
);
