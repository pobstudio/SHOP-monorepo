import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { PrintServiceV2 } from '../typechain/PrintServiceV2';
import {
  PrintServiceProductContractType,
  PRINT_SERVICE_CURRENCY_CONFIG,
  PRINT_SERVICE_PRODUCT_CONFIG,
} from '../contracts/print-service/constants';
import { NETWORK_NAME_CHAIN_ID } from '../utils';

const CURRENT_ORDER_ID = 0; // EDIT THIS

task(
  'deploy-print-service-v2',
  'Deploys PrintService Contract',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    const chainId = isProd ? 1 : 4;
    const owner = (await hre.ethers.getSigners())[0];

    await hre.run('compile');

    console.log(`deploying with ${await owner.getAddress()}`);

    // deploy PrintServiceV2
    const PrintService = await hre.ethers.getContractFactory('PrintServiceV2');
    const printService = (await PrintService.deploy(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].multisig, // _treasury
      CURRENT_ORDER_ID, // _orderId
    )) as PrintServiceV2;
    await printService.deployed();
    console.log('PrintServiceV2 deployed to: ', printService.address);
    console.log(
      '\nwith treasury @ ',
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].multisig,
    );
    console.log('\nwith orderId @ ', CURRENT_ORDER_ID);

    // setup Pricing data
    console.log('Wiring Metadata: setCurrencyConfig + setProductConfig');
    for (const [i, address] of Object.entries(
      PRINT_SERVICE_CURRENCY_CONFIG(chainId),
    )) {
      const currencyIndex = Math.floor(Number(i));
      console.log('setCurrencyConfig: ', currencyIndex, address);
      await printService.setCurrencyConfig(currencyIndex, address, {
        gasLimit: 111111,
      });

      for (const [j, product] of Object.entries(
        PRINT_SERVICE_PRODUCT_CONFIG(chainId)[currencyIndex],
      )) {
        const productIndex = Math.floor(Number(j));
        console.log(
          'setProductConfig: ',
          productIndex,
          (product as PrintServiceProductContractType).id,
        );
        await printService.setProductConfig(
          currencyIndex,
          productIndex,
          product as PrintServiceProductContractType,
          { gasLimit: 111111 },
        );
      }
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
  'verify-print-service-v2-deploy',
  'Verifies PrintService Deployment',
  async (args, hre) => {
    // connect to PrintServiceV2
    const PrintService = await hre.ethers.getContractFactory('PrintServiceV2');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2,
    )) as PrintServiceV2;

    const contractOwner = await printService.owner();
    console.log(
      `Contract: ${
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printService
      } is owned by ${contractOwner}`,
    );
  },
);

task(
  'verify-print-service-v2-etherscan',
  'Verifies PrintService Deployment',
  async (args, hre) => {
    // Verifies Print Service Contract on Etherscan
    await hre.run('verify:verify', {
      address:
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2,
      constructorArguments: [
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].multisig,
        CURRENT_ORDER_ID,
      ],
    });
  },
);

task(
  'update-print-service-v2-currency',
  'Updates PrintService Products',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    const chainId = isProd ? 1 : 4;

    const PrintService = await hre.ethers.getContractFactory('PrintServiceV2');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2,
    )) as PrintServiceV2;

    const CURRENCY_INDEX = 1; // EDIT THIS + PRINT_SERVICE_CURRENCY_CONFIG

    console.log('Updating currencyConfig...');
    await printService.setCurrencyConfig(
      CURRENCY_INDEX,
      PRINT_SERVICE_CURRENCY_CONFIG(chainId)[CURRENCY_INDEX],
      { gasLimit: 111111 },
    );

    console.log(
      `Successfully updated currencyConfig for PrintServiceV2 ✓: ${
        hre.network.name
      } @ ${
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2
      }`,
    );
  },
);

task(
  'update-print-service-v2-product',
  'Updates PrintService Products',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    const chainId = isProd ? 1 : 4;

    const PrintService = await hre.ethers.getContractFactory('PrintServiceV2');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2,
    )) as PrintServiceV2;

    const CURRENCY_INDEX = 1; // EDIT THIS + PRINT_SERVICE_PRODUCT_CONFIG
    const PRODUCT_INDEX = 1; // EDIT THIS + PRINT_SERVICE_PRODUCT_CONFIG

    console.log('Updating currencyConfig...');
    await printService.setProductConfig(
      CURRENCY_INDEX,
      PRODUCT_INDEX,
      PRINT_SERVICE_PRODUCT_CONFIG(chainId)[CURRENCY_INDEX][PRODUCT_INDEX],
      { gasLimit: 111111 },
    );

    console.log(
      `Successfully updated productConfig for PrintServiceV2 ✓: ${
        hre.network.name
      } @ ${
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2
      }`,
    );
  },
);
