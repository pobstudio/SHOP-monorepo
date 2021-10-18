export interface Deployment {
  erc20: string;
  multisig: string;
  deployer: string;
  poster: string;
}

export type Deployments = { [chainId: number]: Deployment };
