import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const Stamp: FC<{ textColor?: string; backgroundColor?: string }> = ({
  textColor,
  backgroundColor,
}) => {
  return (
    <Link passHref href={`/`}>
      <StampContainer style={{ backgroundColor }}>
        <StampText style={{ color: textColor }}>POB</StampText>
      </StampContainer>
    </Link>
  );
};

const STAMP_CONTAINER_WIDTH = 50;

const StampContainer = styled.a`
  width: ${STAMP_CONTAINER_WIDTH}px;
  height: ${STAMP_CONTAINER_WIDTH}px;
  display: flex;
  color: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const StampText = styled.span`
  font-family: Bebas Neue;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  margin: 0;
  padding: 0;
  color: white;
`;
