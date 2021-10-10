import styled from 'styled-components';
import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from '../constants';
import { BREAKPTS } from '../styles';

export const Page = styled.div`
  margin: auto;
  max-width: 650px;
  padding: 0 12px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  @media (max-width: ${BREAKPTS.SM}px) {
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT}px);
  }
  overflow: hidden;
`;

export const MainContent = styled.div<{ background?: string }>`
  width: 100%;
  /* background-color: #f9f9f9; */
  background: ${(p) => (p.background ? p.background : '#fff')};
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  @media (max-width: ${BREAKPTS.SM}px) {
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT}px);
  }
`;

export const ContentRow = styled.div`
  max-width: ${BREAKPTS.LG}px;
  margin: 0 auto;
  @media (max-width: ${BREAKPTS.LG}px) {
    max-width: 100%;
    padding: 0 16px;
  }
  @media (max-width: ${BREAKPTS.SM}px) {
    max-width: 100%;
    padding: 0 16px;
  }
`;

export const BetweenContentAndFooterSpacer = styled.div`
  height: 64px;
  width: 100%;
  @media (max-width: ${BREAKPTS.SM}px) {
    height: 32px;
  }
`;
