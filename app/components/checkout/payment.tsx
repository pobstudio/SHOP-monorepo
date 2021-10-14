import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, useCallback, FC } from 'react';
import styled from 'styled-components';
import { SlimSectionBody } from '.';
import { LONDON_GIFT_CONTRACT } from '../../constants';
import { usePosterCheckoutContract } from '../../hooks/useContracts';
import { useSetApprove } from '../../hooks/useSetApproval';

export type ProductsType =
  | 'PRINT_PAPER_HASH'
  | 'PRINT_FRAME_HASH'
  | 'PRINT_PAPER_LONDON'
  | 'PRINT_FRAME_LONDON';

export const PRICING = {
  PRINT_PAPER_HASH: 10000,
  PRINT_FRAME_HASH: 30000,
  PRINT_PAPER_LONDON: 10000,
  PRINT_FRAME_LONDON: 30000,
};

const usePaymentFlow = (product: ProductsType) => {
  const [paying, setPaying] = useState(false);
  const price = PRICING[product];
  const slippage = 0.05;

  const token = '$LONDON';
  const amountDue = price;

  const { approve, isApproving, isApproved } = useSetApprove();
  const posterCheckout = usePosterCheckoutContract();

  const handlePay = useCallback(async () => {
    if (paying || !posterCheckout) {
      return;
    }
    setPaying(true);
    console.log('calculate payment stub');
    console.log('approve london tokens needed');
    console.log('start contract interaction to accept payment');
    const res = await posterCheckout?.buy(
      0,
      LONDON_GIFT_CONTRACT,
      8776,
      'wiggle',
    );
    console.log(res);
    // setPaying(false);
  }, [paying, posterCheckout]);

  const onButtonClick = useCallback(() => {
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
    amountDue,
    price,
    token,
    slippage,
    handlePay,
    onButtonClick,
    payingState: payingState,
  };
};

export const PaymentFlow: FC<{
  asset: any;
  product: ProductsType;
  disabled: boolean;
}> = ({ asset, product, disabled }) => {
  const [hoverPurchaseButton, setHoverPurchaseButton] = useState(false);
  const {
    amountDue,
    onButtonClick,
    token,
    payingState,
    slippage,
  } = usePaymentFlow(product);

  const purchaseButton = useMemo(() => {
    if (hoverPurchaseButton) {
      if (disabled) {
        return {
          color: RED,
          text: 'Not Ready',
          underline: false,
          disabled: true,
        };
      }
    }
    return {
      color: GREEN,
      text: 'Purchase Now',
    };
  }, [hoverPurchaseButton, disabled]);

  const { account } = useWeb3React();

  const purchaseButtonOnClick = useCallback(async () => {
    if (disabled || !account || !asset) {
      return;
    }
    await onButtonClick();
  }, [disabled]);

  return (
    <>
      <Price>
        {amountDue} {token}
        {/* <Slippage>Slip 5%</Slippage> */}
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
