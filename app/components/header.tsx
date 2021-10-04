import { FC, useState } from 'react';
import styled from 'styled-components';
import { FlexEnds, Flex } from './flex';
import { Web3Status } from './web3Status';
import { A } from './anchor';
import { BREAKPTS } from '../styles';

const HeaderContainer = styled.div`
  /* padding: 0 12px; */
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: white;
  z-index: 100;
`;

const HeaderRow = styled(FlexEnds)`
  padding: 4px 12px;
`;

const AnchorRow = styled(Flex)`
  > * + * {
    margin-left: 16px;
  }
`;

const AnchorColumn = styled.div`
  a {
    display: block;
  }
  > * + * {
    margin-top: 8px;
  }
`;
const AddressA = styled(A)`
  @media (max-width: ${BREAKPTS.MD}px) {
    display: none;
  }
`;

const DropdownA = styled(A)`
  cursor: pointer;
`;

const DropdownBody = styled.div`
  padding: 8px;
  background: white;
  border: 1px solid black;
  position: absolute;
  left: 0;
  margin-top: 4px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

export const Header: FC = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <HeaderContainer>
      <HeaderRow>
        <div></div>
        <Web3Status />
      </HeaderRow>
    </HeaderContainer>
  );
};
