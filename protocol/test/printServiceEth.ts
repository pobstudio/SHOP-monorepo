import { ethers } from 'hardhat';
import { Signer } from 'ethers';

import { ERC20Mintable } from '../typechain/ERC20Mintable';
import { PrintServiceEth } from '../typechain/PrintServiceEth';
import { expect } from 'chai';
import { ONE_TOKEN_IN_BASE_UNITS } from '../utils';
import { PRINT_SERVICE_ETH_PRODUCTS } from '../contracts/print-service/constants';

const LONDON_GIFT_CONTRACT = '0x7645eec8bb51862a5aa855c40971b2877dae81af';

describe('PrintService', function () {
  let erc20Mintable: ERC20Mintable;
  let printService: PrintServiceEth;

  let owner: Signer;
  let rando: Signer;
  let minter: Signer;
  let treasury: Signer;

  const printPrice = PRINT_SERVICE_ETH_PRODUCTS[0].price;
  const framedPrice = PRINT_SERVICE_ETH_PRODUCTS[1].price;

  const testPrice = ONE_TOKEN_IN_BASE_UNITS.mul(666666);

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    rando = accounts[1];
    minter = accounts[2];
    treasury = accounts[3];
  });

  beforeEach(async function () {
    const PrintService = await ethers.getContractFactory('PrintServiceEth');
    printService = (await PrintService.deploy()) as PrintServiceEth;
    await printService.deployed();
  });

  describe('setTreasury', () => {
    it('should set new treasury address', async function () {
      await printService
        .connect(owner)
        .setTreasury(await treasury.getAddress());
      expect(await printService.treasury()).to.eq(await treasury.getAddress());
    });
    it('should not set new treasury address by rando', async function () {
      await expect(
        printService.connect(rando).setTreasury(await treasury.getAddress()),
      ).to.reverted;
    });
  });

  describe('setProduct', () => {
    it('should set product mapping for all items in array', async function () {
      for (const [index, product] of PRINT_SERVICE_ETH_PRODUCTS.entries()) {
        await printService.connect(owner).setProduct(index, product);
        expect((await printService.products(index)).id).to.eq(product.id);
      }
    });
  });

  describe('setProductInStock', () => {
    it('should set inStock flag for Product at Index', async function () {
      for (const [index, _product] of PRINT_SERVICE_ETH_PRODUCTS.entries()) {
        await printService.connect(owner).setProductInStock(index, false);
        expect((await printService.products(index)).inStock).to.eq(false);
      }
    });
  });

  describe('setProductPrice', () => {
    it('should set price flag for Product at Index', async function () {
      for (const [index, _product] of PRINT_SERVICE_ETH_PRODUCTS.entries()) {
        await printService.connect(owner).setProductPrice(index, testPrice);
        expect((await printService.products(index)).price).to.eq(testPrice);
      }
    });
  });

  describe('buy', () => {
    beforeEach(async () => {
      // set payout / treasury address for incoming payments
      await printService
        .connect(owner)
        .setTreasury(await treasury.getAddress());

      // set products
      for (const [index, product] of PRINT_SERVICE_ETH_PRODUCTS.entries()) {
        await printService.connect(owner).setProduct(index, product);
      }
    });

    it('Product 0: Complete Payment', async function () {
      const productIndex = 0;
      await printService
        .connect(rando)
        .buy(
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          {
            value: PRINT_SERVICE_ETH_PRODUCTS[productIndex].price,
          },
        );
    });

    it('Product 1: Complete Payment', async function () {
      const productIndex = 1;
      await printService
        .connect(rando)
        .buy(
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          {
            value: PRINT_SERVICE_ETH_PRODUCTS[productIndex].price,
          },
        );
    });

    it('Product 0: Rejects Payment', async function () {
      await expect(
        printService
          .connect(rando)
          .buy(
            0,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            {
              value: PRINT_SERVICE_ETH_PRODUCTS[1].price,
            },
          ),
      ).to.revertedWith('Incorrect payment');
    });

    it('Product 1: Rejects Payment', async function () {
      await expect(
        printService
          .connect(rando)
          .buy(
            1,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            {
              value: PRINT_SERVICE_ETH_PRODUCTS[0].price,
            },
          ),
      ).to.revertedWith('Incorrect payment');
    });
  });
});
