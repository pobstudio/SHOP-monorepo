import { ethers } from 'hardhat';
import { Signer } from 'ethers';

import { ERC20Mintable } from '../typechain/ERC20Mintable';
import { PrintServiceV2 } from '../typechain/PrintServiceV2';
import { expect } from 'chai';
import {
  PrintServiceProductContractType,
  PRINT_SERVICE_CURRENCY_CONFIG,
  PRINT_SERVICE_CONFIG,
} from '../contracts/print-service/constants';

const LONDON_GIFT_CONTRACT = '0x7645eec8bb51862a5aa855c40971b2877dae81af';

describe('PrintServiceV2', function () {
  let printService: PrintServiceV2;

  let owner: Signer;
  let rando: Signer;
  let minter: Signer;
  let treasury: Signer;

  let erc20Mintable: ERC20Mintable;
  const printLondonPrice =
    PRINT_SERVICE_CONFIG(1)[PRINT_SERVICE_CURRENCY_CONFIG(1).london][0].price;
  const framedLondonPrice =
    PRINT_SERVICE_CONFIG(1)[PRINT_SERVICE_CURRENCY_CONFIG(1).london][1].price;
  const TOKEN_SYMBOL = '$LONDON';
  const TOKEN_NAME = 'LONDON';

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    rando = accounts[1];
    minter = accounts[2];
    treasury = accounts[3];
  });

  beforeEach(async function () {
    // Deploy LONDON ERC20
    const Erc20Mintable = await ethers.getContractFactory('ERC20Mintable');
    erc20Mintable = (await Erc20Mintable.deploy(
      await minter.getAddress(),
      TOKEN_NAME,
      TOKEN_SYMBOL,
    )) as ERC20Mintable;
    await erc20Mintable.deployed();

    // Deploy PrintServiceV2
    const PrintService = await ethers.getContractFactory('PrintServiceV2');
    printService = (await PrintService.deploy(
      await treasury.getAddress(),
      0,
    )) as PrintServiceV2;
    await printService.deployed();
  });

  describe('setTreasury', () => {
    it('should set new treasury address', async function () {
      expect(await printService.treasury()).to.eq(await treasury.getAddress());
      await printService
        .connect(owner)
        .setTreasury(await treasury.getAddress());
      expect((await printService.treasury()).toLowerCase()).to.eq(
        (await treasury.getAddress()).toLowerCase(),
      );
    });
    it('should not set new treasury address by rando', async function () {
      await expect(
        printService.connect(rando).setTreasury(await treasury.getAddress()),
      ).to.reverted;
    });
  });

  describe('setProducts for each currency', () => {
    it('it should succeed for all currencies and products', async function () {
      for (const [a, products] of Object.entries(PRINT_SERVICE_CONFIG(1))) {
        const address =
          a == PRINT_SERVICE_CURRENCY_CONFIG(1).london
            ? erc20Mintable.address
            : a;
        await printService.setProducts(address, [products[0], products[1]]);
        console.log('Successfully set Products for: ', address);
        expect((await printService.config(address, 0)).id).to.eq(
          products[0].id,
        );
        expect((await printService.config(address, 1)).id).to.eq(
          products[1].id,
        );
      }
    });
  });

  describe('buy', () => {
    beforeEach(async () => {
      // set products + currency
      for (const [a, products] of Object.entries(PRINT_SERVICE_CONFIG(1))) {
        const address =
          a == PRINT_SERVICE_CURRENCY_CONFIG(1).london
            ? erc20Mintable.address
            : a;
        await printService.setProducts(address, [products[0], products[1]]);
      }

      // mint $london token => rando wallet
      await erc20Mintable
        .connect(minter)
        .mint(await rando.getAddress(), framedLondonPrice.mul(1));

      // approve $london token transfer from rando wallet => to printService contract
      await erc20Mintable
        .connect(rando)
        .approve(printService.address, framedLondonPrice.mul(1));

      // mint $london token => to printService contract owner
      await erc20Mintable
        .connect(minter)
        .mint(await owner.getAddress(), framedLondonPrice.mul(100));

      await erc20Mintable
        .connect(owner)
        .approve(printService.address, framedLondonPrice.mul(100));
    });

    // ETH Test
    it('ETH: Product 0: Exact Payment', async function () {
      const productIndex = 0;
      const currency = PRINT_SERVICE_CURRENCY_CONFIG(1).eth;
      const price = PRINT_SERVICE_CONFIG(1)[currency][productIndex].price;
      const beforeBalance = await treasury.getBalance();
      await printService
        .connect(rando)
        .buy(
          currency,
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          {
            value: price,
          },
        );
      const afterBalance = await treasury.getBalance();
      expect(afterBalance.sub(beforeBalance)).to.deep.eq(price);
    });

    it('ETH: Product 1: Exact Payment', async function () {
      const productIndex = 1;
      const currency = PRINT_SERVICE_CURRENCY_CONFIG(1).eth;
      const price = PRINT_SERVICE_CONFIG(1)[currency][productIndex].price;
      const beforeBalance = await treasury.getBalance();
      await printService
        .connect(rando)
        .buy(
          currency,
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          {
            value: price,
          },
        );
      const afterBalance = await treasury.getBalance();
      expect(afterBalance.sub(beforeBalance)).to.deep.eq(price);
    });

    it('ETH: Product 0: Over Payment', async function () {
      const productIndex = 0;
      const currency = PRINT_SERVICE_CURRENCY_CONFIG(1).eth;
      const price = PRINT_SERVICE_CONFIG(1)[currency][productIndex].price;
      const badPrice =
        PRINT_SERVICE_CONFIG(1)[currency][productIndex + 1].price;
      const beforeOwnerBalance = await treasury.getBalance();
      const beforeRandoBalance = await rando.getBalance();
      await printService
        .connect(rando)
        .buy(
          currency,
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
          {
            value: badPrice,
          },
        );
      const afterOwnerBalance = await treasury.getBalance();
      const afterRandoBalance = await rando.getBalance();
      expect(afterOwnerBalance.sub(beforeOwnerBalance)).to.deep.eq(price);
      expect(beforeRandoBalance > afterRandoBalance).to.deep.eq(true);
    });

    it('ETH: Product 1: Under Payment', async function () {
      const productIndex = 1;
      const currency = PRINT_SERVICE_CURRENCY_CONFIG(1).eth;
      const price = PRINT_SERVICE_CONFIG(1)[currency][productIndex].price;
      const badPrice =
        PRINT_SERVICE_CONFIG(1)[currency][productIndex - 1].price;
      const beforeOwnerBalance = await treasury.getBalance();
      await expect(
        printService
          .connect(rando)
          .buy(
            currency,
            productIndex,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            {
              value: badPrice,
            },
          ),
      ).to.revertedWith('Insufficient payment');
      const afterOwnerBalance = await treasury.getBalance();
      expect(afterOwnerBalance).to.deep.eq(beforeOwnerBalance);
    });

    it('ETH: Out of Stock', async function () {
      const productIndex = 0;
      const currency = PRINT_SERVICE_CURRENCY_CONFIG(1).eth;
      const price = PRINT_SERVICE_CONFIG(1)[currency][productIndex].price;
      const beforeOwnerBalance = await treasury.getBalance();
      await printService
        .connect(owner)
        .setInStock(currency, productIndex, false);
      await expect(
        printService
          .connect(rando)
          .buy(
            currency,
            productIndex,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
            {
              value: price,
            },
          ),
      ).to.revertedWith('Out of stock');
      const afterOwnerBalance = await treasury.getBalance();
      expect(afterOwnerBalance).to.deep.eq(beforeOwnerBalance);
    });

    // LONDON Test
    it('LONDON: Product 0: Exact Payment', async function () {
      const productIndex = 0;
      const currency = erc20Mintable.address;
      const beforeLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      await printService
        .connect(rando)
        .buy(
          currency,
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
        );
      const afterLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      expect(beforeLondonBalance.sub(afterLondonBalance)).to.eq(
        printLondonPrice,
      );
    });

    it('LONDON: Product 1: Exact Payment', async function () {
      const productIndex = 1;
      const currency = erc20Mintable.address;
      const beforeLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      await printService
        .connect(rando)
        .buy(
          currency,
          productIndex,
          LONDON_GIFT_CONTRACT,
          8776,
          '0x0000000000000000000000000000000000000000000000000000000000000001',
        );
      const afterLondonBalance = await erc20Mintable.balanceOf(
        await rando.getAddress(),
      );
      expect(beforeLondonBalance.sub(afterLondonBalance)).to.eq(
        framedLondonPrice,
      );
    });

    it('LONDON: Reject if not approved', async function () {
      const currency = erc20Mintable.address;
      await erc20Mintable
        .connect(rando)
        .approve(printService.address, printLondonPrice.mul(2).sub(1));
      await expect(
        printService
          .connect(rando)
          .buy(
            currency,
            1,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ),
      ).to.revertedWith(
        'VM Exception while processing transaction: revert ERC20: transfer amount exceeds allowance',
      );
    });

    it('LONDON: Reject if not enough balance', async function () {
      const currency = erc20Mintable.address;
      await erc20Mintable
        .connect(rando)
        .transfer(await owner.getAddress(), framedLondonPrice.mul(1));
      await expect(
        printService
          .connect(rando)
          .buy(
            currency,
            1,
            LONDON_GIFT_CONTRACT,
            8776,
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ),
      ).to.revertedWith(
        'VM Exception while processing transaction: revert ERC20: transfer amount exceeds balance',
      );
    });
  });
});
