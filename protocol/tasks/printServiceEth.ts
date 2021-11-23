import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { PrintServiceEth } from '../typechain/PrintServiceEth';
import { PRINT_SERVICE_ETH_PRODUCTS } from '../contracts/print-service/constants';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task(
  'deploy-print-service-eth',
  'Deploys PrintService Contract',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    const owner = (await hre.ethers.getSigners())[0];

    await hre.run('compile');

    console.log(`deploying with ${await owner.getAddress()}`);

    // deploy PrintServiceEth
    const PrintService = await hre.ethers.getContractFactory('PrintServiceEth');
    const printService = (await PrintService.deploy()) as PrintServiceEth;
    await printService.deployed();
    console.log('PrintServiceEth deployed to: ', printService.address);

    console.log('wiring metadata: setTreasury');
    await printService.setTreasury(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].multisig,
    );

    console.log('Wiring Metadata: setProduct for each price');
    for (const [index, product] of PRINT_SERVICE_ETH_PRODUCTS.entries()) {
      await printService.setProduct(index, product, { gasLimit: 111111 });
    }

    // MAINNET ONLY
    if (isProd) {
      console.log('Wiring Metadata: transferOwnership to POB Multisig');
      await printService.transferOwnership(
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].multisig,
      );
    }

    console.log(
      `Successfully deployed PrintServiceEth ✓: ${hre.network.name} @ ${printService.address}`,
    );
  },
);

task(
  'verify-print-service-eth-deploy',
  'Verifies PrintService Deployment',
  async (args, hre) => {
    // connect to PrintService
    const PrintService = await hre.ethers.getContractFactory('PrintServiceEth');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService,
    )) as PrintServiceEth;

    const contractOwner = await printService.owner();
    console.log(
      `Contract: ${
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService
      } is owned by ${contractOwner}`,
    );
  },
);

task(
  'verify-print-service-eth-etherscan',
  'Verifies PrintService Deployment',
  async (args, hre) => {
    // Verifies Print Service Contract on Etherscan
    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService,
      constructorArguments: [
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].erc20,
      ],
    });
  },
);

task(
  'update-print-service-eth-products',
  'Updates PrintService Products',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    // connect to PrintService
    const PrintService = await hre.ethers.getContractFactory('PrintServiceEth');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService,
    )) as PrintServiceEth;

    console.log('Setting new Products metadata');
    for (const [index, product] of PRINT_SERVICE_ETH_PRODUCTS.entries()) {
      await printService.setProduct(index, product, { gasLimit: 111111 });
    }

    console.log(
      `Successfully updated Products for PrintService ✓: ${
        hre.network.name
      } @ ${deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService}`,
    );
  },
);
