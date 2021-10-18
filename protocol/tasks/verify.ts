import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task(
  'verify-etherscan',
  'Verifies contracts on Etherscan',
  async (args, hre) => {
    await hre.run('verify:verify', {
      address: deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].poster,
      constructorArguments: [
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].erc20,
      ],
    });
  },
);
