import styled from 'styled-components';

export const PageTitle = styled.h4`
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
  color: black;
  text-transform: uppercase;
`;

export const PageCaption = styled.h4`
  text-align: center;
  font-size: 12px;
  font-weight: lighter;
  color: black;
  text-transform: uppercase;
  * {
    text-align: center;
    font-size: 12px;
    font-weight: lighter;
    color: black;
    text-transform: uppercase;
  }
  a {
    text-decoration: underline;
    &:hover,
    :visited {
      color: black;
    }
  }
`;

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${256 * 3}px;
  margin: 40px auto;
`;
