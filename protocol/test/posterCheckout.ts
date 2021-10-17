import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';

import { ERC20Mintable } from '../typechain/ERC20Mintable';
import { PosterCheckout } from '../typechain/PosterCheckout';
import { expect } from 'chai';
import { getAddress } from '@ethersproject/address';

const TOKEN_SYMBOL = '$LONDON';
const TOKEN_NAME = '$LONDON';

const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');
const ONE_MWEI = ethers.utils.parseUnits('1', 'mwei');
const ONE_GWEI = ethers.utils.parseUnits('1', 'gwei');

describe('PosterCheckout', function () {
  let erc20Mintable: ERC20Mintable;
  let posterCheckout: PosterCheckout;

  let owner: Signer;
  let rando: Signer;
  let minter: Signer;
  let treasury: Signer;

  const printPrice = ONE_TOKEN_IN_BASE_UNITS.mul(10000);
  const framedPrice = ONE_TOKEN_IN_BASE_UNITS.mul(30000);

  const products = [
    {
      id: 'PRINT_PAPER_HASH',
      price: printPrice,
      inStock: true,
    },
    {
      id: 'PRINT_FRAME_HASH',
      price: framedPrice,
      inStock: true,
    },
    {
      id: 'PRINT_PAPER_LONDON',
      price: printPrice,
      inStock: true,
    },
    {
      id: 'PRINT_FRAME_LONDON',
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
      treasury,
    )) as PosterCheckout;
    await posterCheckout.deployed();
  });

  describe('constructor', () => {
    it('should configure variables correctly', async function () {
      expect(await posterCheckout.payableErc20()).to.eq(erc20Mintable.address);
      expect(await posterCheckout.treasury()).to.eq(treasury);
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
    it('should set product mapping: 0', async function () {
      const index = 0;
      await posterCheckout.connect(owner).setProduct(index, products[index]);
      expect(await posterCheckout.products(index)).to.eq(products[index]);
    });
    it('should set product mapping: 1', async function () {
      const index = 1;
      await posterCheckout.connect(owner).setProduct(index, products[index]);
      expect(await posterCheckout.products(index)).to.eq(products[index]);
    });
    it('should set product mapping: 2', async function () {
      const index = 2;
      await posterCheckout.connect(owner).setProduct(index, products[index]);
      expect(await posterCheckout.products(index)).to.eq(products[index]);
    });
    it('should set product mapping: 3', async function () {
      const index = 3;
      await posterCheckout.connect(owner).setProduct(index, products[index]);
      expect(await posterCheckout.products(index)).to.eq(products[index]);
    });
  });

  // describe('buy', () => {
  //   beforeEach(async () => {
  //     await erc20Mintable
  //       .connect(minter)
  //       .mint(await rando.getAddress(), mintPrice.mul(maxMintPerAddress + 1));
  //     await erc20Mintable
  //       .connect(rando)
  //       .approve(londonGift.address, mintPrice.mul(maxMintPerAddress + 1));
  //     await londonGift.connect(owner).setTreasury(await treasury.getAddress());
  //     await londonGift
  //       .connect(owner)
  //       .setMintStartAtBlockNum(mintStartAtBlockNum);
  //     await londonGift
  //       .connect(owner)
  //       .setUnlockStartAtBlockNum(unlockStartAtBlockNum);
  //     await erc20Mintable
  //       .connect(minter)
  //       .mint(await owner.getAddress(), mintPrice.mul(100));
  //     await erc20Mintable
  //       .connect(owner)
  //       .approve(londonGift.address, mintPrice.mul(100));
  //   });

  // });
});
