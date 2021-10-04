import styled from 'styled-components';
import { Flex } from './flex';

export const LinksRow = styled(Flex)`
  padding: 12px 0;
  > a + a {
    margin-left: 12px;
  }
`;

export const Link = styled.a`
  color: black;
`;
