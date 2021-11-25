import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { ERC20Mintable } from '../typechain/ERC20Mintable';
import { NETWORK_NAME_CHAIN_ID, ONE_TOKEN_IN_BASE_UNITS } from '../utils';

const tokenSymbol = 'POSTER';
const tokenName = 'POSTER';

task('deploy-poster', 'Deploys $POSTER ERC20', async (args, hre) => {
  const owner = (await hre.ethers.getSigners())[0];
  const ownerAddress = await owner.getAddress();

  await hre.run('compile');

  console.log(`deploying with ${ownerAddress}`);

  // deploy erc20
  const Erc20Mintable = await hre.ethers.getContractFactory('ERC20Mintable');
  const erc20 = (await Erc20Mintable.deploy(
    ownerAddress,
    tokenName,
    tokenSymbol,
  )) as ERC20Mintable;
  await erc20.deployed();
  console.log(
    `$${tokenSymbol} deployed to: ${hre.network.name} @ ${erc20.address}`,
  );
});

task('mint-poster', 'Mints $POSTER ERC20 token', async (args, hre) => {
  const owner = (await hre.ethers.getSigners())[0];
  const ownerAddress = await owner.getAddress();

  const Erc20Mintable = await hre.ethers.getContractFactory('ERC20Mintable');
  const erc20 = (await Erc20Mintable.attach(
    deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].poster,
  )) as ERC20Mintable;

  const AMOUNT_TO_MINT = 128;

  // mint erc20 to caller
  await erc20.mint(ownerAddress, ONE_TOKEN_IN_BASE_UNITS.mul(AMOUNT_TO_MINT));

  console.log(
    `Minted ${AMOUNT_TO_MINT} $${tokenSymbol} => ${ownerAddress}: ${hre.network.name}`,
  );
});

task(
  'etherscan-verify-poster',
  'Verifies POSTER Deployment on Etherscan',
  async (args, hre) => {
    const owner = (await hre.ethers.getSigners())[0];
    const ownerAddress = await owner.getAddress();
    await hre.run('verify:verify', {
      address: deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].poster,
      constructorArguments: [ownerAddress, tokenName, tokenSymbol],
    });
  },
);
