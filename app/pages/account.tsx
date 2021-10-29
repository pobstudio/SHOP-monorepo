import React, { FC } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { ContentWrapper, MainContent } from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { useWeb3React } from '@web3-react/core';
import { Web3Status } from '../components/web3Status';
import { usePrintOrdersByAccount } from '../hooks/usePrintQueue';
import {
  getPrintServicePackageNameFromProductType,
  PrintServiceAirtableRecordType,
  PrintServiceProductType,
} from '../utils/airtable';
import { shortenHexString } from '../utils/hex';
import { ROUTES } from '../constants/routes';
import Link from 'next/link';
import { PageTitle, PageCaption, PageBody } from '../components/common';

const AccountPage: NextPage = () => {
  const { account } = useWeb3React();
  const records = usePrintOrdersByAccount(account);
  const noOrdersFound = !records || records?.length === 0;
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>
          <br />
          <br />
          <PageTitle>My Orders</PageTitle>
          <Orders>
            {!!account ? (
              <>
                {noOrdersFound ? (
                  <Order />
                ) : (
                  <>
                    {records?.map(
                      (
                        record: {
                          fields: PrintServiceAirtableRecordType;
                          id: string;
                        },
                        index: number,
                      ) => (
                        <>
                          <Order
                            key={`order-cell-${index}`}
                            data={record.fields}
                          />
                          <br />
                        </>
                      ),
                    )}
                  </>
                )}
              </>
            ) : (
              <Web3Status />
            )}
          </Orders>

          <PageCaption>
            Don't see your order? Refresh the page in 1 minute.
          </PageCaption>
          <PageCaption>
            <Link href={ROUTES.SUPPORT} passHref>
              <a>Contact Support</a>
            </Link>
          </PageCaption>
          <br />
          <br />
        </MainContent>
        <Footer />
      </ContentWrapper>
    </>
  );
};

export default React.memo(AccountPage);

const Order: FC<{ data?: PrintServiceAirtableRecordType }> = ({ data }) => {
  console.log('Order: ', data);
  const order = (key: string): any => (data ? data[key] ?? '––' : '––');
  return (
    <OrderBox>
      <OrderRow>
        <div>Order ID</div>
        <div>{order('order id')}</div>
      </OrderRow>

      <OrderRow>
        <div>Status</div>
        <div>{order('status')}</div>
      </OrderRow>

      <OrderRow>
        <div>Created</div>
        <div>
          {data
            ? new Date(Date.parse(order('created at'))).toUTCString()
            : order('created at')}
        </div>
      </OrderRow>

      <OrderRow>
        <div>Package</div>
        <div>
          {data
            ? getPrintServicePackageNameFromProductType[
                order('type') as PrintServiceProductType
              ]
            : order('type')}
        </div>
      </OrderRow>

      <OrderRow>
        <div>Collection</div>
        <div>{order('collection')}</div>
      </OrderRow>

      <OrderRow>
        <div>Artwork</div>
        {order('opensea').includes('http') ? (
          <a href={order('opensea')} target="_blank" rel="noopener noreferrer">
            {order('name')}
          </a>
        ) : (
          <div>{order('name')}</div>
        )}
      </OrderRow>

      <OrderRow>
        <div>Receipt</div>
        {order('etherscan').includes('http') ? (
          <a
            href={order('etherscan')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortenHexString(order('etherscan'), 12)}
          </a>
        ) : (
          <div>{order('etherscan')}</div>
        )}
      </OrderRow>

      {data && data['tracking'] && (
        <OrderRow>
          <div>Tracking ID</div>
          <div>{order('tracking')}</div>
        </OrderRow>
      )}
    </OrderBox>
  );
};

const Orders = styled(PageBody)`
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
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

  * {
    color: black;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  a {
    text-decoration: underline;
    &:hover,
    :visited {
      color: black;
    }
  }

  &:not(:first-child) {
    margin-top: 12px;
  }
`;
