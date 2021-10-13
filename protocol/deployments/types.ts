export interface Deployment {
  multisig: string;
  erc1155: string;
  poster: string;
}

export type Deployments = { [chainId: number]: Deployment };
