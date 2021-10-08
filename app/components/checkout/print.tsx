import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect, useMemo, useCallback, FC } from 'react';
import styled from 'styled-components';
import { RightSection, SectionBody, SlimSectionBody } from '.';
import { useAccountCollections } from '../../hooks/useCollection';

export const PrintCheckout = () => {
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

  const [artwork, setArtworkOption] = useState<'london' | 'hash'>('london');
  const handleArtChange = (e: any) => setArtworkOption(e.target.value);

  const [artworkID, setArtworkID] = useState<string>('');
  const handleArtIDChange = (e: any) => setArtworkID(e.target.value);

  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const [shipping, setShipping] = useState<string>('');
  const handleShippingChange = (e: any) => setShipping(e.target.value);

  const [hoverPurchaseButton, setHoverPurchaseButton] = useState(false);
  const purchaseButton = useMemo(() => {
    const green = '#44db5e';
    const grey = '#FF6565';
    if (hoverPurchaseButton) {
      if (!email || !shipping || !artwork || !artworkID) {
        return {
          color: grey,
          text: 'Not Ready',
          underline: false,
          disabled: true,
        };
      }
    }
    return {
      color: green,
      text: 'Purchase Print',
    };
  }, [hoverPurchaseButton, artwork, artworkID, email, shipping]);
  const purchaseButtonOnClick = useCallback(() => {
    if (!email || !shipping || !artwork || !artworkID) {
      return;
    }
  }, [artwork, artworkID, email, shipping]);

  const { account } = useWeb3React();
  const collections = useAccountCollections(account);
  console.log(collections);

  const ArtworkSelectValues: FC = () => {
    if (artwork === 'hash') {
      return (
        <>
          <option value="">-</option>
          {collections?.hash?.map((asset: any) => (
            <option value={asset}>{asset.name}</option>
          ))}
        </>
      );
    }
    return (
      <>
        <option value="">-</option>
        {collections?.['london-gifts']?.map((asset: any) => (
          <option value={asset}>{asset.name}</option>
        ))}
      </>
    );
  };

  return (
    <>
      <RightSection>
        <Price>
          {/* {price} ETH  */}1 POSTER = {(price / 0.0000123).toFixed(0)}{' '}
          $LONDON
          <Slippage>Slip 5%</Slippage>
        </Price>
        <PurchaseButton
          onClick={purchaseButtonOnClick}
          onMouseEnter={() => setHoverPurchaseButton(true)}
          onMouseLeave={() => setHoverPurchaseButton(false)}
          style={{
            background: purchaseButton.color,
            textDecoration: purchaseButton.underline ? 'underline' : 'none',
            cursor: purchaseButton.disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {purchaseButton.text}
        </PurchaseButton>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Collection</h4>
          <br />
          <select onChange={(e) => handleArtChange(e)}>
            <option value="london">LONDON GIFT</option>
            <option value="hash">HASH</option>
          </select>
        </SectionBody>
        <SectionBody>
          <h4>Select Artwork</h4>
          <br />
          <select onChange={(e) => handleArtIDChange(e)}>
            <ArtworkSelectValues />
          </select>
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Choose Package</h4>
          <br />
          <select
            // style={{ width: '50%' }}
            onChange={(e) => handleFrameChange(e)}
          >
            <option value="paper">
              No Frame / Print Only - Ships in 2 Weeks
            </option>
            <option value="framed">
              Custom Black Metal Framing - Ships in 4 Weeks
            </option>
          </select>
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Contact Info</h4>
          <br />
          <input
            value={email}
            onChange={handleEmailChange}
            type="text"
            placeholder="email@pob.studio"
          />
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Name & Shipping Address</h4>
          <br />
          <input
            value={shipping}
            onChange={handleShippingChange}
            type="text"
            placeholder="Cookie Monster, 123 Sesame St, Kings Park, NY 11754"
          />
        </SectionBody>
      </RightSection>
    </>
  );
};

const Price = styled(SlimSectionBody)`
  display: flex;
  justify-content: center;
  align-items: center;
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
  right: 6px;
  font-size: 10px;
  font-weight: normal;
  color: black;
  opacity: 0.4;
  text-transform: uppercase;
`;

const PurchaseButton = styled(SlimSectionBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-weight: lighter;
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
`;
