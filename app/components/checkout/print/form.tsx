import React, { useState, useMemo, FC } from 'react';
import { useWeb3React } from '@web3-react/core';
import { RightSection, SectionBody, SlapImage } from '..';
import {
  COLLECTION_MAP,
  useAccountCollections,
} from '../../../hooks/useCollection';
import { PrintServiceProductType } from '../../../utils/airtable';
import { PaymentFlow } from './payment';
import { FIRESTORE_PRINT_SERVICE_RECORD } from '../../../clients/firebase';

export const PrintCheckout: FC = () => {
  const { account } = useWeb3React();
  const collections = useAccountCollections(account);

  const [artwork, setArtworkOption] = useState<'london-gifts' | 'hash'>(
    'london-gifts',
  );
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

  const [printOption, setPrintOption] =
    useState<PrintServiceProductType>('print0');
  const handlePrintOptionChange = (e: any) => setPrintOption(e.target.value);

  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const [shipping, setShipping] = useState<string>('');
  const handleShippingChange = (e: any) => setShipping(e.target.value);

  const artworkAsset = useMemo(() => {
    return collections[artwork]?.find((a: any) => a.token_id === artworkID);
  }, [artwork, printOption, artworkID, collections]);

  const paymentDisabled =
    !artwork || !artworkID || !printOption || !email || !shipping;

  const orderDetails: FIRESTORE_PRINT_SERVICE_RECORD = useMemo(
    () => ({
      collectionName: artwork,
      collectionContract: COLLECTION_MAP[artwork],
      productType: printOption,
      customerContact: email,
      customerShipping: shipping,
      customerWallet: account,
      status: 'pending',
      timestamp: new Date(),
      tokenId: artworkID,
    }),
    [artwork, artworkID, printOption, email, shipping, account],
  );

  return (
    <>
      <RightSection>
        <PaymentFlow
          artCollection={COLLECTION_MAP[artwork]}
          artTokenID={artworkID}
          product={printOption}
          disabled={paymentDisabled}
          orderDetails={orderDetails}
        />
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Collection</h4>
          <br />
          <select onChange={(e) => handleArtChange(e)}>
            <option value="london-gifts">LONDON GIFT</option>
            <option value="hash">HASH</option>
          </select>
        </SectionBody>
        <SectionBody>
          <h4>Select Artwork</h4>
          <br />
          <select onChange={(e) => handleArtIDChange(e)}>
            {ArtworkIDSelectValues}
          </select>
          {artworkAsset?.asset && (
            <SlapImage src={artworkAsset?.asset?.image_url as string} />
          )}
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Choose Package</h4>
          <br />
          <select onChange={(e) => handlePrintOptionChange(e)}>
            <option value="print0">
              No Frame / Print Only - Ships in 2 Weeks
            </option>
            <option value="print1">
              Premium Black Metal Framing - Ships in 4 Weeks
            </option>
          </select>
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Contact Info</h4>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="email@pob.studio"
          />
        </SectionBody>
      </RightSection>

      <RightSection>
        <SectionBody>
          <h4>Name & Shipping Address</h4>
          <br />
          <input
            type="street-address"
            id="street-address"
            name="street-address"
            autoComplete="street-address"
            value={shipping}
            onChange={handleShippingChange}
            placeholder="Cookie Monster, 123 Sesame St, Kings Park, NY 11754, USA"
          />
        </SectionBody>
      </RightSection>
    </>
  );
};
