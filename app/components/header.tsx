import { FC, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useWindowSize } from 'react-use';
import {
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  STUDIO_PROD_LINK,
} from '../constants';
import { BREAKPTS } from '../styles';
import { MenuIcon } from './icons/menu';
import { CloseIcon } from './icons/close';
import { BaseButton } from './button';
import { Web3Status } from './web3Status';
import { useModalStore } from '../stores/modal';

export const Header: FC = () => {
  const {
    isMenuModalOpen,
    isWalletModalOpen,
    setIsWalletModalOpen,
    setIsMenuModalOpen,
  } = useModalStore();
  const dismissAllModals = useCallback(() => {
    setIsWalletModalOpen(false);
    setIsMenuModalOpen(false);
  }, [setIsWalletModalOpen, setIsMenuModalOpen]);

  const isModalOpen = useMemo(() => {
    return isMenuModalOpen || isWalletModalOpen;
  }, [isMenuModalOpen, isWalletModalOpen]);

  const { width } = useWindowSize();
  const isMobile = useMemo(() => width <= BREAKPTS.SM, [width]);

  return (
    <HeaderWrapper>
      <HeaderSpacer />
      <HeaderRow>
        <HeaderSideContentWrapper>
          <HeaderLogoWrapper>
            <HeaderLogoText
              onClick={() => {
                dismissAllModals();
              }}
              href={STUDIO_PROD_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              PoB
            </HeaderLogoText>
            <HeaderSlashWrapper>
              <svg
                width="32"
                height="32"
                fill="#eaeaea"
                stroke="#eaeaea"
                strokeLinecap="round"
                strokeLinejoin="round"
                color="#eaeaea"
                shapeRendering="geometricPrecision"
                viewBox="0 0 24 24"
              >
                <path d="M16.88 3.549L7.12 20.451"></path>
              </svg>
            </HeaderSlashWrapper>
            <Link href={'/'} passHref>
              <ProjectTitleText>Shop</ProjectTitleText>
            </Link>
            {!isMobile && (
              <Link href={'/'} passHref>
                <LightNavLink style={{ transform: 'translateY(-1px)' }}>
                  Q421: CATALOG
                </LightNavLink>
              </Link>
            )}
          </HeaderLogoWrapper>
        </HeaderSideContentWrapper>
        <HeaderRightSideContentWrapper>
          <Web3Status />
        </HeaderRightSideContentWrapper>
      </HeaderRow>
    </HeaderWrapper>
  );
};

const SPACER_HEIGHT = 0;

const HeaderSpacer = styled.div`
  width: 100%;
  height: ${SPACER_HEIGHT}px;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  height: ${HEADER_HEIGHT - SPACER_HEIGHT}px;
  padding: 0 16px 0 24px;
  @media (max-width: ${BREAKPTS.SM}px) {
    grid-template-columns: 1fr 2fr;
    padding: 0 16px 0 16px;
    height: ${MOBILE_HEADER_HEIGHT - SPACER_HEIGHT}px;
  }
`;

const HeaderWrapper = styled.div`
  background: white;
  transition: background 200ms ease-in-out;
  z-index: 1000;
  position: relative;
  border-bottom: 1px solid black;
`;

const HeaderSideContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRightSideContentWrapper = styled(HeaderSideContentWrapper)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: 200ms ease-in-out opacity;
`;

const HeaderLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogoText = styled.a`
  color: black;
  font-size: 24px;
  font-family: Bebas Neue;
  text-decoration: none;
  opacity: 0.5;
`;

const HeaderSlashWrapper = styled.div`
  transform: translateY(1.5px);
  margin: 0 -1px 0 -2px;
`;

const ProjectTitleText = styled.a`
  color: black;
  font-size: 20px;
  font-weight: 700;
  font-family: Helvetica;
  text-decoration: none;
  text-transform: uppercase;
  transform: translateY(-1px);
`;

const NavLink = styled.a`
  font-weight: 600;
  color: black;
  font-size: 14px;
  text-decoration: none;
  padding: 8px;
  text-decoration: none;
  &:focus {
    color: black;
  }
  &:hover {
    color: #0000ff;
  }
`;

const LightNavLink = styled.a`
  font-weight: 500;
  color: black;
  font-size: 14px;
  text-decoration: none;
  margin-left: 32px;
  white-space: nowrap;
  &:focus {
    color: black;
  }
`;
