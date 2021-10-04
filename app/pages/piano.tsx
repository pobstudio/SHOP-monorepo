import React, { FC } from 'react';
import { NextPage } from 'next';
import { Page } from '../components/content';
import { H4, P, Bold } from '../components/text';
import { A } from '../components/anchor';
import styled from 'styled-components';
import { Link, LinksRow } from '../components/links';
import { Flex, FlexEnds } from '../components/flex';
import { Header } from '../components/header';
import { STUDIO_PROD_LINK } from '../constants';
import { ROUTES } from '../constants/routes';

const IndexPage: NextPage = () => {
  return (
    <Page>
      <Header />
      <HeroContainer>
        <Container>
          <FlexEnds>
            <H4>
              000. <Bold>"A public piano"</Bold>
            </H4>
            <H4 style={{ opacity: 0.2 }}>COMING SOON</H4>
          </FlexEnds>
          <P style={{ opacity: 0.2 }}>
            is a NFT inspired by pianos in public spaces like airports; they are
            played by a person and enjoyed by many. The piano is simply a medium
            of expression.
          </P>
          <div>
            <P>is a NFT collection limited to a supply of 64. The catch?</P>
            <P>
              Owner of token id <Bold>0</Bold> gets to dictate what the NFT
              metadata points to.
            </P>
          </div>
          <P>
            A writer can point the NFT to short stories, a generative artist to
            abstract art, a music producer to his/her beats.
          </P>
          <P>
            You don't own a static NFT, you don't own the output of a singular
            artist. You own the right to enjoy what the owner of token id{' '}
            <Bold>0</Bold> wants the NFT to express today.
          </P>
          {/* <P>
            Find the collection <A>here</A> on OpenSea.
          </P> */}
          <P>
            [Coming soon]
          </P>
        </Container>
        <Well>
          <P>
            <Bold>How to acquire the NFT</Bold>
          </P>
          <P style={{ paddingTop: 12 }}>
            Initially POB studios own all 64 NFTs, we will distribute 1 per
            address that meets one of these requirements:
          </P>
          <P style={{ paddingTop: 12 }}>
            → Own a complete $LONDON GIFT tile set (Cities, pipes, etc)
          </P>
          <P style={{ paddingTop: 12 }}>
            → Own a 'unique' name attribute $LONDON GIFT
          </P>
          <P style={{ paddingTop: 12 }}>→ Own 4 verified $HASH</P>
          <P style={{ paddingTop: 12 }}>→ Own 100000 $LONDON</P>
          {/* <P style={{ paddingTop: 12 }}>
            If you qualify, DM us at{' '}
            <A style={{ color: 'white' }}>@prrfbeauty</A>
          </P>
          <P style={{ paddingTop: 24 }}>
            <Bold>Current amount left: </Bold> 63
          </P> */}
        </Well>
        {/* <Container>
          <P style={{ marginBottom: 12 }}>
            <Bold>Current owner of token id 0:</Bold> davidsun.eth
          </P>
          <P style={{ marginBottom: 12 }}>
            <Bold>Current metadata for all 64 NFTs:</Bold>
          </P>
        </Container>
        <Container>
          <P style={{ marginBottom: 12 }}>
            <Bold>HISTORY OF METADATA CHANGES</Bold>
          </P>
          <FlexEnds>
            <P style={{ marginBottom: 12 }}>
              [Transfer] <A>davidsun.eth</A> → <A>sirsu.eth</A>
            </P>
            <P style={{ opacity: 0.2 }}>01-07-2021</P>
          </FlexEnds>
        </Container> */}
        <P style={{ paddingTop: 12, opacity: 0.2 }}>
          Details subject to change when released
        </P>
      </HeroContainer>
    </Page>
  );
};

const Well = styled.div`
  padding: 12px;
  background: black;
  color: white;
`;

const Container = styled.div`
  > * + * {
    margin-top: 12px;
  }
`;

const HeroContainer = styled.div`
  padding-top: 120px;
  > div + div {
    margin-top: 36px;
  }
`;

export default React.memo(IndexPage);
