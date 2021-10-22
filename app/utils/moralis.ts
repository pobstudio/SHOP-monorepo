interface MoralisConfig {
  [key: string]: {
    [index: number]: {
      appId: string;
      serverUrl: string;
    };
  };
}

export const MORALIS_CONFIG: MoralisConfig = {
  SHOP: {
    1: {
      appId: `WO3H96BYLze0qTPDL7oBGibX7xQKTmRBvZAJj6To`,
      serverUrl: `https://pezkpgdeidou.usemoralis.com:2053/server`,
    },
    4: {
      appId: `V9GsKJfcAf40a1Yqkz3M7icnlKYKHl3XaicJd2nR`,
      serverUrl: `https://l7ogtslo4zfy.usemoralis.com:2053/server`,
    },
  },
};
