export interface Deployment {
  erc20: string;
  multisig: string;
  poster: string;
}

export type Deployments = { [chainId: number]: Deployment };
