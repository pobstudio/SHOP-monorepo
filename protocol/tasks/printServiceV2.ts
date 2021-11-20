import { task } from 'hardhat/config';
import { deployments } from '../deployments';
import { PrintServiceV2 } from '../typechain/PrintServiceV2';
import {
  PrintServiceProductContractType,
  PRINT_SERVICE_CURRENCY_CONFIG,
  PRINT_SERVICE_CONFIG,
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

    // setup Product data for each Currency
    console.log('Wiring Metadata: setProducts for each currency');
    for (const [address, products] of Object.entries(
      PRINT_SERVICE_CONFIG(chainId),
    )) {
      await printService.setProducts(address, [products[0], products[1]], {
        gasLimit: 222222,
      });
      console.log('Successfully set Products for: ', address);
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
  'update-print-service-v2-products',
  'Updates PrintService Products',
  async (args, hre) => {
    const isProd = hre.network.name.includes('mainnet');
    const chainId = isProd ? 1 : 4;

    const PrintService = await hre.ethers.getContractFactory('PrintServiceV2');
    const printService = (await PrintService.attach(
      deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2,
    )) as PrintServiceV2;

    for (const [address, products] of Object.entries(
      PRINT_SERVICE_CONFIG(chainId),
    )) {
      await printService.setProducts(address, [products[0], products[1]], {
        gasLimit: 222222,
      });
      console.log('Successfully set Products for: ', address);
    }

    console.log(
      `Successfully updated productConfig for PrintServiceV2 ✓: ${
        hre.network.name
      } @ ${
        deployments[NETWORK_NAME_CHAIN_ID[hre.network.name]].printServiceV2
      }`,
    );
  },
);
