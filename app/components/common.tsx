import styled from 'styled-components';

export const PageTitle = styled.h4`
  text-align: center;
  font-size: 16px;
  font-weight: lighter;
  color: black;
  text-transform: uppercase;
`;

export const PageBodySection = styled.div`
  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const PageSubheader = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin: 0;
  padding: 0;
  padding: 12px 0;
`;

export const PageText = styled.h5`
  font-size: 12px;
  font-weight: lighter;
  color: black;
  margin: 0;
  padding: 0;
  line-height: 18px;
  a,
  :visited {
    color: black;
  }
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
