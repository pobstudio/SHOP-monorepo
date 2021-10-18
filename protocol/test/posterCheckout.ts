import { ethers } from 'hardhat';
import { Signer } from 'ethers';

import { ERC20Mintable } from '../typechain/ERC20Mintable';
import { PosterCheckout } from '../typechain/PosterCheckout';
import { expect } from 'chai';

const TOKEN_SYMBOL = '$LONDON';
const TOKEN_NAME = '$LONDON';

const LONDON_GIFT_CONTRACT = '0x7645eec8bb51862a5aa855c40971b2877dae81af';

const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');

describe('PosterCheckout', function () {
  let erc20Mintable: ERC20Mintable;
  let posterCheckout: PosterCheckout;

  let owner: Signer;
  let rando: Signer;
  let minter: Signer;
  let treasury: Signer;

  const printPrice = ONE_TOKEN_IN_BASE_UNITS.mul(10000);
  const framedPrice = ONE_TOKEN_IN_BASE_UNITS.mul(30000);

  const testPrice = ONE_TOKEN_IN_BASE_UNITS.mul(666666);

  const products = [
    {
      id: 'frame0',
      price: printPrice,
      inStock: true,
    },
    {
      id: 'frame1',
      price: framedPrice,
      inStock: true,
    },
  ];

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

    const PosterCheckout = await ethers.getContractFactory('PosterCheckout');
    posterCheckout = (await PosterCheckout.deploy(
      erc20Mintable.address,
    )) as PosterCheckout;
    await posterCheckout.deployed();
  });

  describe('constructor', () => {
    it('should configure variables correctly', async function () {
      expect(await posterCheckout.payableErc20()).to.eq(erc20Mintable.address);
    });
  });

  describe('setTreasury', () => {
    it('should set new treasury address', async function () {
      await posterCheckout
        .connect(owner)
        .setTreasury(await treasury.getAddress());
      expect(await posterCheckout.treasury()).to.eq(
        await treasury.getAddress(),
      );
    });
    it('should not set new treasury address by rando', async function () {
      await expect(
        posterCheckout.connect(rando).setTreasury(await treasury.getAddress()),
      ).to.reverted;
    });
  });

  describe('setProduct', () => {
    it('should set product mapping for all items in array', async function () {
      for (const [index, product] of products.entries()) {
        await posterCheckout.connect(owner).setProduct(index, product);
        expect((await posterCheckout.products(index)).id).to.eq(product.id);
      }
    });
  });

  describe('setProductInStock', () => {
    it('should set product mapping for all items in array', async function () {
      for (const [index, _product] of products.entries()) {
        await posterCheckout.connect(owner).setProductInStock(index, false);
        expect((await posterCheckout.products(index)).inStock).to.eq(false);
      }
    });
  });

  describe('setProductPrice', () => {
    it('should set product mapping for all items in array', async function () {
      for (const [index, _product] of products.entries()) {
        await posterCheckout.connect(owner).setProductPrice(index, testPrice);
        expect((await posterCheckout.products(index)).price).to.eq(testPrice);
      }
    });
  });

  describe('buy', () => {
    beforeEach(async () => {
      // mint $london token => rando wallet
      await erc20Mintable
        .connect(minter)
        .mint(await rando.getAddress(), framedPrice.mul(1));

      // approve $london token transfer from rando wallet => to posterCheckout contract
      await erc20Mintable
        .connect(rando)
        .approve(posterCheckout.address, framedPrice.mul(1));

      // set payout / treasury address for incoming payments
      await posterCheckout
        .connect(owner)
        .setTreasury(await treasury.getAddress());

      // mint $london token => to posterCheckout contract owner
      await erc20Mintable
        .connect(minter)
        .mint(await owner.getAddress(), framedPrice.mul(100));

      await erc20Mintable
        .connect(owner)
        .approve(posterCheckout.address, framedPrice.mul(100));
    });

    it('Product 0: Complete $LONDON Payment', async function () {
      const productIndex = 0;
      const productPrice = products[productIndex].price;
      const beforeLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      await posterCheckout
        .connect(rando)
        .buy(productIndex, LONDON_GIFT_CONTRACT, 8776, 'testing_order_details');
      const afterLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      expect(beforeLondonBalance.sub(afterLondonBalance)).to.eq(productPrice);
    });

    it('Product 1: Complete $LONDON Payment', async function () {
      const productIndex = 1;
      const productPrice = products[productIndex].price;
      const beforeLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      await posterCheckout
        .connect(rando)
        .buy(productIndex, LONDON_GIFT_CONTRACT, 8776, 'testing_order_details');
      const afterLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      expect(beforeLondonBalance.sub(afterLondonBalance)).to.eq(productPrice);
    });

    it('Reject $LONDON token transfer if not approved', async function () {
      await erc20Mintable
        .connect(rando)
        .approve(posterCheckout.address, printPrice.mul(2).sub(1));
      await expect(
        posterCheckout
          .connect(rando)
          .buy(1, LONDON_GIFT_CONTRACT, 8776, 'testing_order_details'),
      ).to.revertedWith('Not enough allowance for payment');
    });

    it('Reject $LONDON token transfer if not enough balance', async function () {
      await erc20Mintable
        .connect(rando)
        .transfer(await owner.getAddress(), framedPrice.mul(1));
      await expect(
        posterCheckout
          .connect(rando)
          .buy(1, LONDON_GIFT_CONTRACT, 8776, 'testing_order_details'),
      ).to.revertedWith('Not enough token to mint');
    });
  });
});
