import React, { FC, useState, useEffect } from 'react';
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
  const [printOnly, setPrintOnly] = useState(true);
  const [frameOption, setFrameOption] = useState<'framed' | 'paper'>('paper');
  const handleFrameChange = (e: any) => setFrameOption(e.target.value);
  useEffect(() => {
    if (frameOption === 'paper') {
      setPrintOnly(true);
    }
    if (frameOption === 'framed') {
      setPrintOnly(false);
    }
  }, [frameOption]);
  const price = printOnly ? 0.08 : 0.25;

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
              <PrintHero />
              <RightSection>
                <Price>
                  {price} ETH = {(price / 0.0000123).toFixed(0)} $LONDON
                  <Slippage>Slip 5%</Slippage>
                </Price>
                <PurchaseButton>Purchase Print</PurchaseButton>
              </RightSection>
              <RightSection>
                <SlimSectionBody>
                  <h4>Choose Type</h4>
                  <br />
                  <select
                    // style={{ width: '50%' }}
                    onChange={(e) => handleFrameChange(e)}
                  >
                    <option value="paper">No Frame / Paper Only</option>
                    <option value="framed">Framed</option>
                  </select>
                </SlimSectionBody>
              </RightSection>
              <RightSection>
                <SlimSectionBody>
                  <h4>Contact Info</h4>
                  <br />
                  <input type="text" placeholder="email@pob.studio" />
                </SlimSectionBody>
              </RightSection>
              <RightSection>
                <SlimSectionBody>
                  <h4>Shipping Address</h4>
                  <br />
                  <input
                    type="text"
                    placeholder="123 Wall St, New York, NY 10001"
                  />
                </SlimSectionBody>
              </RightSection>
              <RightSection>
                <SlimSectionBody>
                  <h4>Select Artwork</h4>
                  <br />
                  <select onChange={(e) => handleFrameChange(e)}>
                    <option value="paper">LONDON GIFT</option>
                    <option value="framed">HASH</option>
                  </select>
                </SlimSectionBody>
                <SlimSectionBody>
                  <h4>Select Token ID</h4>
                  <br />
                  <select onChange={(e) => handleFrameChange(e)}>
                    <option value="paper">8765</option>
                  </select>
                </SlimSectionBody>
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

const PurchaseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: lighter;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  color: #000000;
  width: 50%;

  background-color: #74d86d;
  cursor: pointer;
  &:hover {
  }
`;

const PrintHero: FC = () => (
  <RightSection>
    <SectionBody>
      <h1>Official Print Service</h1>
      <p>
        Select any Proof of Beauty artwork you own to print. All prints require
        $LONDON token to purchase. Enter your Contact Info and Shipping Address
        to ensure delivery.
        <br />
        <br />
        Shipping Information • FAQs •{' '}
        <a
          href="https://matcha.xyz/markets/1/0x491d6b7d6822d5d4bc88a1264e1b47791fd8e904"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get $LONDON
        </a>
      </p>
    </SectionBody>
  </RightSection>
);

const PrintDetails: FC = () => (
  <RightSection>
    <SlimSectionBody>
      <h4>Product Details</h4>
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
        HASH Prints
        <ul>
          <li>Print Sizing: 18 inches x 24 inches ( 45.72 cm x 60.96 cm )</li>
          <li>Framed Size: 20 inches x 26 inches ( 50.8 cm x 66.04 cm )</li>
        </ul>
        <br />
        LONDON GIFT Prints
        <ul>
          <li>
            Print Sizing: 24.55 inches x 24.55 inches ( 62.36 cm x 62.36 cm )
          </li>
          <li>
            Framed Size: 26.55 inches x 26.55 inches ( 67.44 cm x 67.44 cm )
          </li>
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
    </SlimSectionBody>
  </RightSection>
);

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

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    color: #000000;
    text-transform: uppercase;
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
    font-size: 12px;
    line-height: 16px;
    color: #000000;
    text-transform: uppercase;
    margin-top: -8px;
  }
  p {
    margin-top: 12px;
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
  select {
    width: 100%;
    outline: none;
    appearance: none;
    padding: 10px 12px;
    border: 1px solid black;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOS4wOSAxTDQuNTQ1IDQuNTkgMCAxIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48L3N2Zz4=');
    background-position-x: calc(100% - 10px);
    background-position-y: 50%;
    background-size: 11px 5px;
    background-repeat: no-repeat;
    font-size: 12px;
    font-weight: lighter;
  }
  input {
    outline: none;
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid black;
    font-size: 12px;
    font-weight: lighter;
  }
`;

const SectionBody = styled.div`
  display: block;
  padding: 32px;
  width: 100%;

  &:nth-child(even) {
    border-left: 1px solid black;
  }
`;

const SlimSectionBody = styled(SectionBody)`
  padding: 28px 32px;
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
  span {
    font-size: 12px;
    opacity: 0.5;
  }
`;
const Slippage = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 10px;
  font-weight: normal;
  color: black;
  opacity: 0.4;
  text-transform: uppercase;
`;
