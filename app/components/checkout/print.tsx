import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, FC } from 'react';
import { RightSection, SectionBody, SlapImage } from '.';
import { useAccountCollections } from '../../hooks/useCollection';
import { PaymentFlow, ProductsType } from './payment';

export const PrintCheckout = () => {
  const { account } = useWeb3React();
  const collections = useAccountCollections(account);

  const [artwork, setArtworkOption] = useState<'london' | 'hash'>('london');
  const handleArtChange = (e: any) => setArtworkOption(e.target.value);

  const [artworkID, setArtworkID] = useState<string>('');
  const handleArtIDChange = (e: any) => setArtworkID(e.target.value);
  const ArtworkIDSelectValues = useMemo(() => {
    if (artwork === 'hash') {
      return (
        <>
          <option value="">-</option>
          {collections?.hash?.map((asset: any) => (
            <option key={asset.name} value={asset.token_id}>
              {asset.name}
            </option>
          ))}
        </>
      );
    }
    return (
      <>
        <option value="">-</option>
        {collections?.['london-gifts']?.map((asset: any) => (
          <option key={asset.name} value={asset.token_id}>
            {asset.name}
          </option>
        ))}
      </>
    );
  }, [artwork, collections]);

  const [frameOption, setFrameOption] = useState<'framed' | 'paper'>('paper');
  const handleFrameChange = (e: any) => setFrameOption(e.target.value);

  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const [shipping, setShipping] = useState<string>('');
  const handleShippingChange = (e: any) => setShipping(e.target.value);

  const reducer = useMemo(() => {
    let asset = {} as any;
    let product: ProductsType = 'FAILURE_TO_LAUNCH';

    if (artwork === 'london') {
      asset = collections['london-gifts'!]?.find(
        (a: any) => a.token_id === artworkID,
      );
      product = 'PRINT_PAPER_LONDON';
      if (frameOption === 'framed') {
        product = 'PRINT_FRAME_LONDON';
      }
    }

    if (artwork === 'hash') {
      asset = collections?.hash?.find((a: any) => a.token_id === artworkID);
      product = 'PRINT_PAPER_HASH';
      if (frameOption === 'framed') {
        product = 'PRINT_FRAME_HASH';
      }
    }

    return {
      asset,
      product,
    };
  }, [artwork, frameOption, artworkID, collections]);

  const paymentDisabled =
    !artwork || !artworkID || !frameOption || !email || !shipping;

  return (
    <>
      <RightSection>
        <PaymentFlow
          asset={reducer.asset}
          product={reducer.product}
          disabled={paymentDisabled}
        />
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
            {ArtworkIDSelectValues}
          </select>
          {reducer?.asset && (
            <SlapImage src={reducer?.asset?.image_url as string} />
          )}
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Choose Package</h4>
          <br />
          <select onChange={(e) => handleFrameChange(e)}>
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
