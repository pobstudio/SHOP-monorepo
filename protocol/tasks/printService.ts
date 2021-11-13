import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { PrintService } from '../typechain/PrintService';
import {
  PRINT_SERVICE_PRODUCTS,
  PRINT_SERVICE_PRODUCTS_TEST,
} from '../contracts/print-service/constants';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

task(
  'deploy-print-service',
  'Deploys PrintService Contract',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    const owner = (await hre.ethers.getSigners())[0];

    await hre.run('compile');

    console.log(`deploying with ${await owner.getAddress()}`);

    const Erc20Mintable = await hre.ethers.getContractFactory('ERC20Mintable');

    const erc20 = await Erc20Mintable.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].erc20,
    );
    await erc20.deployed();

    // deploy PrintService
    const PrintService = await hre.ethers.getContractFactory('PrintService');
    const printService = (await PrintService.deploy(
      erc20.address,
    )) as PrintService;
    await printService.deployed();
    console.log('PrintService deployed to: ', printService.address);

    console.log('wiring metadata: setTreasury');
    await printService.setTreasury(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].multisig,
    );

    console.log('Wiring Metadata: setProduct for each price');
    for (const [index, product] of (isProd
      ? PRINT_SERVICE_PRODUCTS
      : PRINT_SERVICE_PRODUCTS_TEST
    ).entries()) {
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
      `Successfully deployed PrintService ✓: ${hre.network.name} @ ${printService.address}`,
    );
  },
);

task(
  'verify-print-service-deploy',
  'Verifies PrintService Deployment',
  async (args, hre) => {
    // connect to PrintService
    const PrintService = await hre.ethers.getContractFactory('PrintService');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService,
    )) as PrintService;

    const contractOwner = await printService.owner();
    console.log(
      `Contract: ${
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService
      } is owned by ${contractOwner}`,
    );
  },
);

task(
  'verify-print-service-etherscan',
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
  'update-print-service-products',
  'Updates PrintService Products',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    // connect to PrintService
    const PrintService = await hre.ethers.getContractFactory('PrintService');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService,
    )) as PrintService;

    console.log('Setting new Products metadata');
    for (const [index, product] of (isProd
      ? PRINT_SERVICE_PRODUCTS
      : PRINT_SERVICE_PRODUCTS_TEST
    ).entries()) {
      await printService.setProduct(index, product, { gasLimit: 111111 });
    }

    console.log(
      `Successfully updated Products for PrintService ✓: ${
        hre.network.name
      } @ ${deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService}`,
    );
  },
);
