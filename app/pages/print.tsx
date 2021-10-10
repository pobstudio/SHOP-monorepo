import React, { FC } from 'react';
import { NextPage } from 'next';
import { ContentWrapper, MainContent } from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import {
  Split,
  LeftSide,
  RightSide,
  RightSection,
  SectionBody,
} from '../components/checkout';
import { PrintCheckout } from '../components/checkout/print';

const PrintPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <Split>
            <LeftSide>
              <img src="/imgs/zrx-framed-photos/frame-1.jpg" />
              <img src="/imgs/zrx-framed-photos/frame-2.jpg" />
              <img src="/imgs/zrx-framed-photos/frame-3.jpg" />
              <img src="/imgs/zrx-framed-photos/frame-4.jpg" />
            </LeftSide>
            <RightSide>
              <PrintHero />
              <PrintCheckout />
              <PrintDetails />
            </RightSide>
          </Split>
        </MainContent>
        <Footer />
      </ContentWrapper>
    </>
  );
};
export default React.memo(PrintPage);

const PrintHero: FC = () => (
  <RightSection>
    <SectionBody style={{ paddingTop: 32 }}>
      <h1>Official Print Service</h1>
      <br />
      <p>
        Select any Proof of Beauty artwork you own to print. All prints require
        $LONDON token to purchase. Enter your Contact Info and Shipping Address
        correctly to ensure delivery.
        <br />
        <br />
        Free International Shipping •{' '}
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
    <SectionBody>
      <h4>Product Details</h4>
      <br />
      <p>
        All prints are done on Hahnemühle Photo Rag 308g paper with
        archival-grade ink. Printed via a fine art 74 inch wide Roland Hi-Fi Jet
        Pro II.
        <br />
        <br />
        Framing Option: All framing is custom, handcrafted black metal. 1 inch
        wide x 1 inch deep.
        <br />
        <br />
      </p>
      <figure>
        <figcaption> HASH Prints</figcaption>
        <ul>
          <li>
            Resolution: 6000px x 9600px. ( Art may vary slightly due to
            resolution increase )
          </li>
          <li>Print Sizing: 18 inches x 24 inches ( 45.72 cm x 60.96 cm )</li>
          <li>Framed Size: 20 inches x 26 inches ( 50.8 cm x 66.04 cm )</li>
          <li>
            Photo Info:{' '}
            <a
              href={`https://hash.pob.studio/art/0xbdab447ba2fd0a493d93635da202ebcfaa309bcc6a22a95d808c93ce8f1c6c2d`}
              target="_blank"
              rel="noopener noreferrer"
            >
              "ZRX Genesis"
            </a>
          </li>
        </ul>
      </figure>
      <br />
      <figure>
        <figcaption> LONDON GIFT Prints</figcaption>
        <ul>
          <li>Resolution: 6144px x 6144px</li>
          <li>Print Sizing: 24 inches x 24 inches ( 60.96 cm x 60.96 cm )</li>
          <li>Framed Size: 26 inches x 26 inches ( 66.04 cm x 66.04 cm )</li>
          <li>
            Photo Info:{' '}
            <a
              href={`https://opensea.io/assets/0x7645eec8bb51862a5aa855c40971b2877dae81af/8776`}
              target="_blank"
              rel="noopener noreferrer"
            >
              "new touted verdant sky"
            </a>
          </li>
        </ul>
      </figure>
      <br />
      <p>
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
        {/* {'. '}
        Framing via{' '}
        <a
          href="https://twitter.com/gallery16"
          target="_blank"
          rel="noopener noreferrer"
        >
          @gallery16
        </a> */}
      </p>
    </SectionBody>
  </RightSection>
);
