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
        <FlexEnds>
          <H4>
            <Bold>PUBLICO</Bold> BY <A href={STUDIO_PROD_LINK}>POB</A>
          </H4>
        </FlexEnds>
        {/* <LinksRow>
          <Link>[explainer]</Link>
          <Link>[connect wallet]</Link>
        </LinksRow> */}
        <P style={{ paddingTop: 12, opacity: 0.2 }}>
          /ˈpuː.bli.koː/ (verb) I make public, I let be known in the public, I
          publish, I issue, I release
        </P>
        <P style={{ paddingTop: 12 }}>
          is an anthology series on NFT standards and exploiting smart
          contracts to produce unique crypto-art public installations.
        </P>
        <ProjectLinksContainer>
          <P style={{ marginBottom: 12 }}>
            <Bold>STUDIES</Bold>
          </P>
          <Project
            number={0}
            name={'A public piano'}
            statusText={'Details revealed!'}
            href={ROUTES.PIANO}
          />
          <Project number={1} name={'Fatal flaw'} statusText={'Coming soon'}/>
          <Project number={2} name={'Loot'} statusText={'Coming soon'} />
          <Project number={3} name={'Entrophic metadata'} statusText={'Coming soon'} />
          <Project number={4} name={'Unownable'} statusText={'Coming soon'} />
          <Project number={5} name={'Bridge to river gwei'} statusText={'Coming soon'} />
          <Project number={6} name={'Transfer to win'} statusText={'Coming soon'} />
          <Project number={7} name={'A cold war'} statusText={'Coming soon'} />
          <Project number={8} name={'Box opened in pandora'} statusText={'Coming soon'} />
        </ProjectLinksContainer>
        <P style={{ paddingTop: 12, opacity: 0.2 }}>
          each study is brutalistic in nature
        </P>
      </HeroContainer>
    </Page>
  );
};

const Project: FC<{
  number: number;
  name: string;
  statusText?: string;
  href?: string;
}> = ({ number, name, statusText, href }) => {
  return (
    <FlexEnds>
      <Flex>
        <P style={{ paddingRight: 8 }}>{number.toString().padStart(3, '0')}.</P>
        <P>
          <A href={href}>{name}</A>
        </P>
      </Flex>
      {<P style={{ opacity: 0.2 }}>{statusText}</P>}
    </FlexEnds>
  );
};

const ProjectLinksContainer = styled.div`
  padding-top: 36px;
  div + div {
    margin-top: 12px;
  }
`;

const HeroContainer = styled.div`
  padding-top: 120px;
`;

export default React.memo(IndexPage);
