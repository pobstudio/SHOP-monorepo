import Link from 'next/link';
import styled from 'styled-components';
import { BREAKPTS } from '../styles';
import {
  FOOTER_HEIGHT,
  MOBILE_FOOTER_HEIGHT,
  BLOG_LINK,
  TWITTER_LINK,
  DISCORD_LINK,
  STUDIO_PROD_LINK,
  PUBLICO_LINK,
  LONDON_LINK,
  HASH_LINK,
} from '../constants';
import { BaseAnchor } from './anchor';
import { Stamp } from './icons/stamp';
import { Flex } from './flex';

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterLeftSideContentWrapper>
        <Flex>
          <Stamp />
          <Link href={'/'} passHref={true}>
            <FooterLogoText>SHOP</FooterLogoText>
          </Link>
        </Flex>
      </FooterLeftSideContentWrapper>
      <FooterRightSideContentWrapper>
        <FooterLinksContainer>
          <FooterLinksColumn>
            <FooterColumnLabel>Proof of Beauty</FooterColumnLabel>
            <FooterLink href={STUDIO_PROD_LINK} target={'_blank'}>
              Studio
            </FooterLink>
            <FooterLink href={PUBLICO_LINK} target={'_blank'}>
              Publico
            </FooterLink>
            <FooterLink href={LONDON_LINK} target={'_blank'}>
              London
            </FooterLink>
            <FooterLink href={HASH_LINK} target={'_blank'}>
              Hash
            </FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterColumnLabel>Contact Us</FooterColumnLabel>
            <FooterLink href={TWITTER_LINK} target={'_blank'}>
              Twitter
            </FooterLink>
            <FooterLink href={DISCORD_LINK} target={'_blank'}>
              Discord
            </FooterLink>
            <FooterLink href={BLOG_LINK} target={'_blank'}>
              Blog
            </FooterLink>
            <FooterLink href={`mailto:team@pob.studio`}>Email</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterColumnLabel>Legal</FooterColumnLabel>
            <FooterLink
              href="https://hash.pob.studio/terms-of-use"
              target={'_blank'}
            >
              Terms of Use
            </FooterLink>
            <FooterLink
              href="https://hash.pob.studio/privacy-policy"
              target={'_blank'}
            >
              Privacy Policy
            </FooterLink>
          </FooterLinksColumn>
        </FooterLinksContainer>
      </FooterRightSideContentWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  // height: ${FOOTER_HEIGHT}px;
  padding: 36px 0 64px 0;
  width: 100%;
  background: #f8f8f8;
  @media (max-width: ${BREAKPTS.SM}px) {
    // height: ${MOBILE_FOOTER_HEIGHT}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const FooterSideContentWrapper = styled.div`
  position: relative;
`;

const FooterLeftSideContentWrapper = styled(FooterSideContentWrapper)`
  display: flex;
  align-items: flex-start;
  padding-left: 24px;
  @media (max-width: ${BREAKPTS.SM}px) {
    flex-direction: column;
    padding-bottom: 24px;
  }
`;

const FooterRightSideContentWrapper = styled(FooterSideContentWrapper)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: ${BREAKPTS.SM}px) {
    justify-content: center;
    padding-top: 10px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const FooterLogoText = styled.a`
  color: black;
  font-size: 14px;
  font-weight: 500;
  font-family: Helvetica;
  text-decoration: none;
  text-transform: uppercase;
  text-decoration: none;
  padding-left: 16px;
  &:focus {
    color: black;
  }
`;

const FooterLinksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 24px;
  padding-right: 24px;
  @media (max-width: ${BREAKPTS.SM}px) {
    padding-right: 0px;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 150%;
  }
`;

const FooterLinksColumn = styled.div`
  grid-template-columns: 1fr;
  @media (max-width: ${BREAKPTS.SM}px) {
    /* padding-right: 0px;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 150%; */
  }
`;

const FooterLink = styled(BaseAnchor)`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  text-decoration: none;
  display: block;
  padding: 3px 0;
  text-transform: uppercase;
  &:focus {
    color: rgba(0, 0, 0, 1);
  }
`;

const FooterColumnLabel = styled.p`
  padding: 0;
  margin: 0;
  word-wrap: break-word;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: black;
  padding-bottom: 3px;
`;
