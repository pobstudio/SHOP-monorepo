import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import {
  BetweenContentAndFooterSpacer,
  ContentWrapper,
  MainContent,
} from '../components/content';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const IndexPage: NextPage = () => {
  return (
    <>
      <ContentWrapper>
        <Header />
        <MainContent>wiggle shop pob stuff</MainContent>
        <BetweenContentAndFooterSpacer />
        <Footer />
      </ContentWrapper>
    </>
  );
};

export default React.memo(IndexPage);
