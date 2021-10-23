import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, useCallback, FC } from 'react';
import styled from 'styled-components';
import { SlimSectionBody } from '..';
import { CHAIN_ID, NULL_ADDRESS } from '../../../constants';
import { usePrintServiceContract } from '../../../hooks/useContracts';
import { useSetApprove } from '../../../hooks/useSetApproval';
import { ONE_TOKEN_IN_BASE_UNITS } from '@pob/protocol/utils';
import {
  PRINT_SERVICE_PRODUCTS as PRINT_SERVICE_PRODUCTS_PROD,
  PRINT_SERVICE_PRODUCTS_TEST,
} from '@pob/protocol/contracts/print-service/constants';
import { BigNumberish } from 'ethers';
import { useTokensStore } from '../../../stores/token';
import { useIsPrintServiceApproved } from '../../../hooks/useIsApproved';
import { PrintServiceProductType } from '../../../utils/airtable';

const PRINT_SERVICE_PRODUCTS =
  CHAIN_ID == 1 ? PRINT_SERVICE_PRODUCTS_PROD : PRINT_SERVICE_PRODUCTS_TEST;

export const getPrintServiceProductIndexFromType = (
  id: PrintServiceProductType,
) => PRINT_SERVICE_PRODUCTS.findIndex((product) => product.id === id);

export const getPricingFromProductType = (id: PrintServiceProductType) =>
  PRINT_SERVICE_PRODUCTS.find((product) => product.id === id)?.price ??
  PRINT_SERVICE_PRODUCTS[0].price;

const usePaymentFlow = (
  product: PrintServiceProductType,
  collection: string,
  tokenID: BigNumberish,
) => {
  const [error, setError] = useState<any | undefined>(undefined);
  const [paying, setPaying] = useState(false);
  const price = getPricingFromProductType(product);

  const amountDueCurrency = '$LONDON';
  const amountDue = price.div(ONE_TOKEN_IN_BASE_UNITS).toNumber();

  const { approve, isApproving } = useSetApprove();
  const printServiceContract = usePrintServiceContract();

  const tokenBalance = useTokensStore((s) => s.tokenBalance);
  const isApproved = useIsPrintServiceApproved(price);
  const isEnoughBalance = useMemo(
    () => tokenBalance.gte(price),
    [tokenBalance, price],
  );
  const isBuyable = useMemo(() => {
    return PRINT_SERVICE_PRODUCTS[getPrintServiceProductIndexFromType(product)]
      .inStock;
  }, [isApproved, isEnoughBalance, product]);

  const handlePay = useCallback(async () => {
    if (paying || !printServiceContract) {
      return;
    }
    try {
      setPaying(true);
      const res = await printServiceContract?.buy(
        getPrintServiceProductIndexFromType(product),
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
  }, [paying, printServiceContract]);

  const onButtonClick = useCallback(async () => {
    if (isApproved) {
      handlePay();
    } else if (!isApproving) {
      approve();
    }
  }, [handlePay, approve, isApproved, isApproving]);

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
  artCollection: string;
  artTokenID: string;
  product: PrintServiceProductType;
  disabled: boolean;
}> = ({ artCollection, artTokenID, product, disabled }) => {
  const [hoverPurchaseButton, setHoverPurchaseButton] = useState(false);
  const {
    amountDue,
    onButtonClick,
    amountDueCurrency,
    payingState,
    isEnoughBalance,
    isBuyable,
  } = usePaymentFlow(product, artCollection, BigInt(artTokenID));

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
    if (reduceDisabled || !account || !artCollection || !artTokenID) {
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
