import styled from 'styled-components';

export const Split = styled.div`
  display: flex;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  overflow: scroll;
  width: 50vw;
  height: calc(100vh - 80px);
  img {
    width: 100%;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  overflow: scroll;
  width: 50vw;
  height: calc(100vh - 80px);
`;

export const RightSection = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  &:last-child {
    border-bottom: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    color: #000000;
    text-transform: uppercase;
  }
  h3 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: #000000;
  }
  h4 {
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
    text-transform: uppercase;
    margin-top: -8px;
  }
  p {
    margin-top: 12px;
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #000000;
    ul {
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    a {
      text-decoration: none;
      color: unset;
      &:hover {
        color: blue;
      }
    }
  }
  select {
    width: 100%;
    outline: none;
    appearance: none;
    padding: 10px 12px;
    border: 1px solid black;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOS4wOSAxTDQuNTQ1IDQuNTkgMCAxIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48L3N2Zz4=');
    background-position-x: calc(100% - 10px);
    background-position-y: 50%;
    background-size: 11px 5px;
    background-repeat: no-repeat;
    font-size: 12px;
    font-weight: lighter;
  }
  input {
    outline: none;
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid black;
    font-size: 12px;
    font-weight: lighter;
  }
`;

export const SectionBody = styled.div`
  display: block;
  padding: 24px 18px;
  width: 100%;

  &:nth-child(even) {
    border-left: 1px solid black;
  }

  br {
    user-select: none;
  }
`;

export const SlimSectionBody = styled(SectionBody)`
  padding: 20px;
`;
