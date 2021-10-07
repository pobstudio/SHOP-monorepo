import React, { FC } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { ContentWrapper, MainContent } from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { useWeb3React } from '@web3-react/core';
import { Web3Status } from '../components/web3Status';
import { usePrintOrdersByAccount } from '../hooks/usePrintQueue';
import { PrintServiceAirtableRecordType } from '../utils/airtable';

const AccountPage: NextPage = () => {
  const { account } = useWeb3React();
  const orders = usePrintOrdersByAccount(account);
  const noOrdersFound = !orders || orders?.length === 0;
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <br />
          <br />
          <PageTitle style={{ textAlign: 'center' }}>My Orders</PageTitle>
          <Orders>
            {!!account ? (
              <>
                {noOrdersFound ? (
                  <Order />
                ) : (
                  <>
                    {orders?.map((order: PrintServiceAirtableRecordType) => (
                      <Order order={order} />
                    ))}
                  </>
                )}
              </>
            ) : (
              <Web3Status />
            )}
          </Orders>
        </MainContent>
        <Footer />
      </ContentWrapper>
    </>
  );
};

export default React.memo(AccountPage);

const Order: FC<{ order?: PrintServiceAirtableRecordType }> = ({ order }) => (
  <OrderBox>
    <OrderRow>
      <div>Order ID</div>
      <div>{order ? order['order id'] : '-'}</div>
    </OrderRow>

    <OrderRow>
      <div>Order Created</div>
      <div>{order ? order['created at'] : '-'}</div>
    </OrderRow>

    <OrderRow>
      <div>Collection</div>
      <div>{order ? order['collection'] : '-'}</div>
    </OrderRow>

    <OrderRow>
      <div>Artwork Name</div>
      <div>{order ? order['name'] : '-'}</div>
    </OrderRow>

    <OrderRow>
      <div>Token ID</div>
      <div>{order ? order['tokenid'] : '-'}</div>
    </OrderRow>

    <OrderRow>
      <div>Order Status</div>
      <div>{order ? order['status'] : '-'}</div>
    </OrderRow>
  </OrderBox>
);

const PageTitle = styled.h4`
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
  color: black;
  text-transform: uppercase;
`;

const Orders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
`;

const OrderBox = styled.div`
  position: relative;
  width: 100%;
  max-width: ${256 * 3}px;
  padding: 24px;
  border: 1px solid black;
  text-decoration: none;
  color: unset;

  display: flex;
  flex-direction: column;
`;

const OrderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-family: Roboto Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &:not(:first-child) {
    margin-top: 12px;
  }
`;
