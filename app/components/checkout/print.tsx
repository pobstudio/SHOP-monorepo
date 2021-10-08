import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, FC } from 'react';
import { RightSection, SectionBody } from '.';
import { useAccountCollections } from '../../hooks/useCollection';
import { PaymentFlow, ProductsType } from './payment';

export const PrintCheckout = () => {
  const { account } = useWeb3React();
  const collections = useAccountCollections(account);

  const [artwork, setArtworkOption] = useState<'london' | 'hash'>('london');
  const handleArtChange = (e: any) => setArtworkOption(e.target.value);

  const [artworkID, setArtworkID] = useState<string>('');
  const handleArtIDChange = (e: any) => setArtworkID(e.target.value);
  const ArtworkIDSelectValues: FC = () => {
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

  const [frameOption, setFrameOption] = useState<'framed' | 'paper'>('paper');
  const handleFrameChange = (e: any) => setFrameOption(e.target.value);

  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const [shipping, setShipping] = useState<string>('');
  const handleShippingChange = (e: any) => setShipping(e.target.value);

  const reduceProduct = useMemo((): ProductsType => {
    if (artwork === 'london') {
      if (frameOption === 'framed') {
        return 'PRINT_FRAME_LONDON';
      }
      return 'PRINT_PAPER_LONDON';
    }

    if (artwork === 'hash') {
      if (frameOption === 'framed') {
        return 'PRINT_FRAME_HASH';
      }
      return 'PRINT_PAPER_HASH';
    }

    return 'FAILURE_TO_LAUNCH';
  }, [artwork, frameOption]);

  const paymentDisabled =
    !artwork || !artworkID || !frameOption || !email || !shipping;

  return (
    <>
      <RightSection>
        <PaymentFlow product={reduceProduct} disabled={paymentDisabled} />
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
            <ArtworkIDSelectValues />
          </select>
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
