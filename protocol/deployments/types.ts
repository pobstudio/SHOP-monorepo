export interface Deployment {
  erc20: string;
  multisig: string;
  deployer: string;
  printService: string;
  printServiceEth: string;
  printServiceV2: string;
  poster: string;
}

export type Deployments = { [chainId: number]: Deployment };

export type ContractEvents = { [chainId: number]: any };
