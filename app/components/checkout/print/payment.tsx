import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, useCallback, useEffect, FC } from 'react';
import styled from 'styled-components';
import { utils, BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/dist/client/router';
import { ONE_TOKEN_IN_BASE_UNITS } from '@pob/protocol/utils';
import {
  PRINT_SERVICE_CURRENCY_CONFIG,
  PRINT_SERVICE_CONFIG,
} from '@pob/protocol/contracts/print-service/constants';
import { SlimSectionBody } from '..';
import {
  CHAIN_ID,
  HASH_CONTRACT,
  LONDON_GIFT_CONTRACT,
} from '../../../constants';
import { usePrintServiceContract } from '../../../hooks/useContracts';
import {
  useLondonApprove,
  usePosterApprove,
} from '../../../hooks/useSetApproval';
import { useTokensStore } from '../../../stores/token';
import {
  useIsPrintServiceLondonApproved,
  useIsPrintServicePosterApproved,
} from '../../../hooks/useIsApproved';
import { PrintServiceProductType } from '../../../utils/airtable';
import { FIRESTORE_PRINT_SERVICE_RECORD } from '../../../clients/firebase';
import { ROUTES } from '../../../constants/routes';
import {
  paymentCurrencyType,
  useCheckoutStore,
} from '../../../stores/checkout';
import { useBalance } from '../../../hooks/useBalance';

const CONTRACTS = [
  LONDON_GIFT_CONTRACT.toLowerCase(),
  HASH_CONTRACT.toLowerCase(),
];

const DISPLAY_CURRENCY_CONFIG: { [key in paymentCurrencyType]: any } = {
  eth: (price: BigNumber) => ethers.utils.formatEther(price),
  london: (price: BigNumber) => price.div(ONE_TOKEN_IN_BASE_UNITS).toNumber(),
  poster: (price: BigNumber) => price.div(ONE_TOKEN_IN_BASE_UNITS).toNumber(),
};

const usePaymentFlow = (
  product: PrintServiceProductType,
  collection: string,
  tokenID: string,
  orderDetails: FIRESTORE_PRINT_SERVICE_RECORD,
) => {
  const balance = useBalance();
  const paymentCurrency = useCheckoutStore((s) => s.paymentCurrency);
  const currencyAddress =
    PRINT_SERVICE_CURRENCY_CONFIG(CHAIN_ID)[paymentCurrency];

  const PRINT_SERVICE_PRODUCTS = Object.values(
    PRINT_SERVICE_CONFIG(CHAIN_ID)[currencyAddress],
  );
  const amountDueCurrency = paymentCurrency.toUpperCase();

  const getPrintServiceProductIndexFromType = (id: PrintServiceProductType) =>
    PRINT_SERVICE_PRODUCTS.findIndex((product: any) => product.id === id);

  const getPricingFromProductType = (id: PrintServiceProductType) =>
    PRINT_SERVICE_PRODUCTS.find((product: any) => product.id === id)?.price ??
    PRINT_SERVICE_PRODUCTS[0].price;

  const price = getPricingFromProductType(product);
  const amountDue = DISPLAY_CURRENCY_CONFIG[paymentCurrency](price);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>(undefined);
  const [paying, setPaying] = useState(false);

  const { approve: londonApprove, isApproving: isLondonApproving } =
    useLondonApprove();
  const { approve: posterApprove, isApproving: isPosterApproving } =
    usePosterApprove();
  const printServiceContract = usePrintServiceContract();

  const orderDetailsHash = (obj: any) =>
    utils.solidityKeccak256(
      Object.keys(obj).map(() => 'string'),
      [...Object.values(obj)],
    );

  const londonBalance = useTokensStore((s) => s.londonBalance);
  const isLondonApproved = useIsPrintServiceLondonApproved(price);
  const posterBalance = useTokensStore((s) => s.posterBalance);
  const isPosterApproved = useIsPrintServicePosterApproved(price);
  const isReady = useMemo(() => {
    if (tokenID !== '' && collection !== '' && orderDetails.customerContact) {
      if (CONTRACTS.includes(collection.toLowerCase())) {
        return true;
      }
    }
    return false;
  }, [tokenID, collection, orderDetails, paymentCurrency, product]);
  const isEnoughBalance = useMemo(() => {
    if (paymentCurrency.includes('london')) {
      return londonBalance.gte(price);
    } else if (paymentCurrency.includes('poster')) {
      return posterBalance.gte(price);
    } else {
      return (
        ethers.utils.formatEther(balance) >= ethers.utils.formatEther(price)
      );
    }
  }, [londonBalance, posterBalance, price, paymentCurrency, product]);
  const isBuyable = useMemo(() => {
    return PRINT_SERVICE_PRODUCTS[getPrintServiceProductIndexFromType(product)]
      .inStock;
  }, [product]);

  const handlePay = useCallback(async () => {
    if (!isReady || paying || !printServiceContract) {
      return;
    }
    setPaying(true);
    const hash = orderDetailsHash(orderDetails);
    const record = orderDetails;
    console.log(hash, 'orderDetailsHash');
    const pushFirebase = await fetch(`/api/new-print`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hash,
        record,
      }),
    });
    if (pushFirebase.ok) {
      try {
        const startPay = await printServiceContract?.buy(
          PRINT_SERVICE_CURRENCY_CONFIG(CHAIN_ID)[paymentCurrency],
          getPrintServiceProductIndexFromType(product),
          collection,
          BigNumber.from(tokenID),
          hash,
          {
            value: paymentCurrency.includes('eth') ? price : 0,
          },
        );
        console.log(startPay);
        setError(undefined);
        setTimeout(() => {
          setPaying(false);
          setSuccess(true);
        }, 30 * 1000);
      } catch (e) {
        console.error(e);
        setPaying(false);
        setSuccess(false);
        // setError(e);
      }
    } else {
      console.error(pushFirebase);
      setPaying(false);
      setSuccess(false);
      setError(new Error('Unable to create new Print Order in Firebase'));
    }
  }, [
    paying,
    printServiceContract,
    isReady,
    orderDetails,
    product,
    collection,
    tokenID,
    paymentCurrency,
  ]);

  const onButtonClick = useCallback(async () => {
    if (paymentCurrency.includes('eth')) {
      handlePay();
      return;
    }
    if (paymentCurrency.includes('london')) {
      if (isLondonApproved) {
        handlePay();
      } else {
        londonApprove();
      }
      return;
    }
    if (paymentCurrency.includes('poster')) {
      if (isPosterApproved) {
        handlePay();
      } else {
        posterApprove();
      }
      return;
    }
  }, [handlePay, paymentCurrency, product, isLondonApproved, isPosterApproved]);

  const payingState = useMemo(() => {
    switch (true) {
      case paying:
        return 'Paying...';
      case isLondonApproving || isPosterApproving:
        return 'Approving...';
      default:
        return '';
    }
  }, [paying, isLondonApproving, isPosterApproving]);

  return {
    price,
    amountDue,
    amountDueCurrency,
    handlePay,
    onButtonClick,
    payingState,
    error,
    success,
    isEnoughBalance,
    isBuyable,
    isReady,
  };
};

export const PaymentFlow: FC<{
  artCollection: string;
  artTokenID: string;
  product: PrintServiceProductType;
  orderDetails: FIRESTORE_PRINT_SERVICE_RECORD;
  disabled: boolean;
}> = ({ artCollection, artTokenID, product, orderDetails, disabled }) => {
  const {
    amountDue,
    onButtonClick,
    amountDueCurrency,
    payingState,
    isEnoughBalance,
    isBuyable,
    isReady,
    success,
    error,
  } = usePaymentFlow(product, artCollection, artTokenID, orderDetails);

  const [hoverPurchaseButton, setHoverPurchaseButton] = useState(false);
  const paymentCurrency = useCheckoutStore((s) => s.paymentCurrency);
  const setPaymentCurrency = useCheckoutStore((s) => s.setPaymentCurrency);
  const togglePaymentCurrency = useCallback(() => {
    if (paymentCurrency.includes('eth')) {
      setPaymentCurrency('london');
    } else if (paymentCurrency.includes('london')) {
      setPaymentCurrency('poster');
    } else {
      setPaymentCurrency('eth');
    }
  }, [paymentCurrency, product]);

  const reduceDisabled =
    !isEnoughBalance ||
    !isBuyable ||
    !isReady ||
    disabled ||
    success ||
    payingState;

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
      if (!isReady || disabled) {
        return {
          color: RED,
          text: `Not Ready`,
          underline: false,
          disabled: true,
        };
      }
    }
    if (error) {
      return {
        color: RED,
        text: 'Error',
        disabled: true,
      };
    }
    if (success) {
      return { color: GREEN, text: 'Success!', disabled: true };
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
    isReady,
    disabled,
    paymentCurrency,
    product,
  ]);

  const { account } = useWeb3React();

  const purchaseButtonOnClick = useCallback(async () => {
    if (reduceDisabled || !account || !artCollection || !artTokenID) {
      return;
    }
    await onButtonClick();
  }, [reduceDisabled, paymentCurrency, product]);

  const router = useRouter();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push(ROUTES.ACCOUNT);
      }, 1.5 * 1000);
    }
  }, [success]);

  return (
    <>
      <Price>
        {amountDue} {amountDueCurrency}
        <svg
          onClick={() => togglePaymentCurrency()}
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="14"
          fill="none"
          viewBox="0 0 13 14"
        >
          <path
            stroke="#000"
            strokeLinecap="square"
            strokeWidth="0.8"
            d="M12 9.578L6.5 13 1.002 9.578M1 4.422L6.5 1 12 4.422"
          ></path>
        </svg>
      </Price>
      <PurchaseButton
        onClick={purchaseButtonOnClick}
        onMouseEnter={() => setHoverPurchaseButton(true)}
        onMouseLeave={() => setHoverPurchaseButton(false)}
        style={{
          background: purchaseButton.color,
          textDecoration: purchaseButton.underline ? 'underline' : 'none',
          cursor:
            reduceDisabled || purchaseButton.disabled
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
  user-select: none;
`;

const Price = styled(SlimSectionBody)`
  position: relative;
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
  svg {
    cursor: pointer;
    position: absolute;
    right: 12px;
  }
`;
