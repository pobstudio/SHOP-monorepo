import { ethers } from 'hardhat';
import { Signer } from 'ethers';

import { ERC20Mintable } from '../typechain/ERC20Mintable';
import { PrintService } from '../typechain/PrintService';
import { expect } from 'chai';
import { ONE_TOKEN_IN_BASE_UNITS } from '../utils';
import { PRINT_SERVICE_PRODUCTS } from '../contracts/print-service/constants';

const TOKEN_SYMBOL = '$LONDON';
const TOKEN_NAME = '$LONDON';

const LONDON_GIFT_CONTRACT = '0x7645eec8bb51862a5aa855c40971b2877dae81af';

describe('PrintService', function () {
  let erc20Mintable: ERC20Mintable;
  let printService: PrintService;

  let owner: Signer;
  let rando: Signer;
  let minter: Signer;
  let treasury: Signer;

  const printPrice = ONE_TOKEN_IN_BASE_UNITS.mul(10000);
  const framedPrice = ONE_TOKEN_IN_BASE_UNITS.mul(30000);

  const testPrice = ONE_TOKEN_IN_BASE_UNITS.mul(666666);

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    rando = accounts[1];
    minter = accounts[2];
    treasury = accounts[3];
  });

  beforeEach(async function () {
    const Erc20Mintable = await ethers.getContractFactory('ERC20Mintable');
    erc20Mintable = (await Erc20Mintable.deploy(
      await minter.getAddress(),
      TOKEN_NAME,
      TOKEN_SYMBOL,
    )) as ERC20Mintable;
    await erc20Mintable.deployed();

    const PrintService = await ethers.getContractFactory('PrintService');
    printService = (await PrintService.deploy(
      erc20Mintable.address,
    )) as PrintService;
    await printService.deployed();
  });

  describe('constructor', () => {
    it('should configure variables correctly', async function () {
      expect(await printService.payableErc20()).to.eq(erc20Mintable.address);
    });
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
      for (const [index, product] of PRINT_SERVICE_PRODUCTS.entries()) {
        await printService.connect(owner).setProduct(index, product);
        expect((await printService.products(index)).id).to.eq(product.id);
      }
    });
  });

  describe('setProductInStock', () => {
    it('should set inStock flag for Product at Index', async function () {
      for (const [index, _product] of PRINT_SERVICE_PRODUCTS.entries()) {
        await printService.connect(owner).setProductInStock(index, false);
        expect((await printService.products(index)).inStock).to.eq(false);
      }
    });
  });

  describe('setProductPrice', () => {
    it('should set price flag for Product at Index', async function () {
      for (const [index, _product] of PRINT_SERVICE_PRODUCTS.entries()) {
        await printService.connect(owner).setProductPrice(index, testPrice);
        expect((await printService.products(index)).price).to.eq(testPrice);
      }
    });
  });

  describe('buy', () => {
    beforeEach(async () => {
      // mint $london token => rando wallet
      await erc20Mintable
        .connect(minter)
        .mint(await rando.getAddress(), framedPrice.mul(1));

      // approve $london token transfer from rando wallet => to printService contract
      await erc20Mintable
        .connect(rando)
        .approve(printService.address, framedPrice.mul(1));

      // set payout / treasury address for incoming payments
      await printService
        .connect(owner)
        .setTreasury(await treasury.getAddress());

      // set products
      for (const [index, product] of PRINT_SERVICE_PRODUCTS.entries()) {
        await printService.connect(owner).setProduct(index, product);
      }

      // mint $london token => to printService contract owner
      await erc20Mintable
        .connect(minter)
        .mint(await owner.getAddress(), framedPrice.mul(100));

      await erc20Mintable
        .connect(owner)
        .approve(printService.address, framedPrice.mul(100));
    });

    it('Product 0: Complete $LONDON Payment', async function () {
      const productIndex = 0;
      const productPrice = PRINT_SERVICE_PRODUCTS[productIndex].price;
      const beforeLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      await printService
        .connect(rando)
        .buy(
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
        );
      const afterLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      expect(beforeLondonBalance.sub(afterLondonBalance)).to.eq(productPrice);
    });

    it('Product 1: Complete $LONDON Payment', async function () {
      const productIndex = 1;
      const productPrice = PRINT_SERVICE_PRODUCTS[productIndex].price;
      const beforeLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      await printService
        .connect(rando)
        .buy(
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
        );
      const afterLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      expect(beforeLondonBalance.sub(afterLondonBalance)).to.eq(productPrice);
    });

    it('Reject $LONDON token transfer if not approved', async function () {
      await erc20Mintable
        .connect(rando)
        .approve(printService.address, printPrice.mul(2).sub(1));
      await expect(
        printService
          .connect(rando)
          .buy(
            1,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ),
      ).to.revertedWith('Not enough allowance for payment');
    });

    it('Reject $LONDON token transfer if not enough balance', async function () {
      await erc20Mintable
        .connect(rando)
        .transfer(await owner.getAddress(), framedPrice.mul(1));
      await expect(
        printService
          .connect(rando)
          .buy(
            1,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ),
      ).to.revertedWith('Not enough token for payment');
    });
  });
});
