import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, useCallback, FC } from 'react';
import styled from 'styled-components';
import { SlimSectionBody } from '..';
import { NULL_ADDRESS } from '../../../constants';
import { usePosterCheckoutContract } from '../../../hooks/useContracts';
import { useSetApprove } from '../../../hooks/useSetApproval';
import {
  ONE_TOKEN_IN_BASE_UNITS,
  POSTER_CHECKOUT_PRODUCTS,
} from '@pob/protocol/utils';
import { BigNumber } from 'ethers';
import { useTokensStore } from '../../../stores/token';
import { useIsApproved } from '../../../hooks/useIsApproved';

export type ProductsType = 'frame0' | 'frame1';

export const getPosterCheckoutProductIndexFromType = (id: ProductsType) =>
  POSTER_CHECKOUT_PRODUCTS.findIndex((product) => product.id === id);

export const PRICING = {
  frame0: POSTER_CHECKOUT_PRODUCTS[0].price,
  frame1: POSTER_CHECKOUT_PRODUCTS[1].price,
};

const usePaymentFlow = (
  product: ProductsType,
  collection: string,
  tokenID: BigNumber,
) => {
  const [error, setError] = useState<any | undefined>(undefined);
  const [paying, setPaying] = useState(false);
  const price = PRICING[product];

  const amountDueCurrency = '$LONDON';
  const amountDue = price.div(ONE_TOKEN_IN_BASE_UNITS).toNumber();

  const { approve, isApproving } = useSetApprove();
  const posterCheckout = usePosterCheckoutContract();

  const tokenBalance = useTokensStore((s) => s.tokenBalance);
  const isApproved = useIsApproved(price);
  const isEnoughBalance = useMemo(() => tokenBalance.gte(price), [
    tokenBalance,
    price,
  ]);
  const isBuyable = useMemo(() => {
    return POSTER_CHECKOUT_PRODUCTS[
      getPosterCheckoutProductIndexFromType(product)
    ].inStock;
  }, [isApproved, isEnoughBalance, product]);

  const handlePay = useCallback(async () => {
    if (paying || !posterCheckout) {
      return;
    }
    setPaying(true);
    console.log('calculate payment stub');
    console.log('approve london tokens needed');
    console.log('start contract interaction to accept payment');
    try {
      const res = await posterCheckout?.buy(
        getPosterCheckoutProductIndexFromType(product),
        collection,
        tokenID,
        '0x01',
      );
      console.log(res);
      setError(undefined);
    } catch (e) {
      console.error(e);
      setError(e);
    }
    setPaying(false);
  }, [paying, posterCheckout]);

  const onButtonClick = useCallback(async () => {
    if (isApproved) {
      handlePay();
    } else {
      approve();
    }
  }, [handlePay, approve, isApproved]);

  const payingState = useMemo(() => {
    switch (true) {
      case paying:
        return 'Paying...';
      case isApproving:
        return 'Approving...';
      default:
        return '';
    }
  }, [paying, isApproving]);

  return {
    price,
    amountDue,
    amountDueCurrency,
    handlePay,
    onButtonClick,
    payingState,
    error,
    isEnoughBalance,
    isBuyable,
  };
};

export const PaymentFlow: FC<{
  asset: any; // OpenSea Object
  product: ProductsType;
  disabled: boolean;
}> = ({ asset, product, disabled }) => {
  const [hoverPurchaseButton, setHoverPurchaseButton] = useState(false);
  const artCollection = asset?.asset_contract?.address ?? NULL_ADDRESS;
  const artTokenID = asset?.token_id ?? 666666;
  const {
    amountDue,
    onButtonClick,
    amountDueCurrency,
    payingState,
    isEnoughBalance,
    isBuyable,
  } = usePaymentFlow(product, artCollection, artTokenID);

  const reduceDisabled = !isEnoughBalance || !isBuyable || disabled;

  const purchaseButton = useMemo(() => {
    if (hoverPurchaseButton) {
      if (!isBuyable) {
        return {
          color: RED,
          text: `Out Of Stock`,
          underline: false,
          disabled: true,
        };
      }
      if (!isEnoughBalance) {
        return {
          color: RED,
          text: `Not Enough Balance`,
          underline: false,
          disabled: true,
        };
      }
      if (disabled) {
        return {
          color: RED,
          text: `Not Ready`,
          underline: false,
          disabled: true,
        };
      }
    }
    return {
      color: GREEN,
      text: 'Purchase Now',
    };
  }, [
    hoverPurchaseButton,
    reduceDisabled,
    isEnoughBalance,
    isBuyable,
    disabled,
  ]);

  const { account } = useWeb3React();

  const purchaseButtonOnClick = useCallback(async () => {
    if (reduceDisabled || !account || !asset) {
      return;
    }
    await onButtonClick();
  }, [reduceDisabled]);

  return (
    <>
      <Price>
        {amountDue} {amountDueCurrency}
      </Price>
      <PurchaseButton
        onClick={purchaseButtonOnClick}
        onMouseEnter={() => setHoverPurchaseButton(true)}
        onMouseLeave={() => setHoverPurchaseButton(false)}
        style={{
          background: purchaseButton.color,
          textDecoration: purchaseButton.underline ? 'underline' : 'none',
          cursor:
            payingState !== '' || purchaseButton.disabled
              ? 'not-allowed'
              : 'pointer',
        }}
      >
        {payingState || purchaseButton.text}
      </PurchaseButton>
    </>
  );
};

const GREEN = '#44db5e';
const RED = '#FF6565';

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
