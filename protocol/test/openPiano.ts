import { ethers } from 'hardhat';
import { BigNumber, Signer } from 'ethers';

import { OpenPiano } from '../typechain/OpenPiano';
import { expect } from 'chai';
import { getAddress } from '@ethersproject/address';

const TOKEN_ID_ZERO = BigNumber.from(0);

const ONE_TOKEN_IN_BASE_UNITS = ethers.utils.parseEther('1');
const ONE_MWEI = ethers.utils.parseUnits('1', 'mwei');
const ONE_GWEI = ethers.utils.parseUnits('1', 'gwei');

describe('OpenPiano', function () {
  // constant values used in transfer tests
  let open: OpenPiano;
  let owner: Signer;
  let artist: Signer;
  let rando: Signer;
  let receiver1: Signer;
  let receiver2: Signer;

  const maxSupply = BigNumber.from(4);

  const name = '$Open piano';
  const symbol = 'GIFT';

  const provenance =
    '0xcc354b3fcacee8844dcc9861004da081f71df9567775b3f3a43412752752c0bf';
  const baseMetadataURI = 'ipfs://test/';
  const contractURI = 'ipfs://contract/';

  before(async function () {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    artist = accounts[1];
    rando = accounts[2];
    receiver1 = accounts[3];
    receiver2 = accounts[4];
  });

  beforeEach(async function () {
    const OpenPiano = await ethers.getContractFactory('OpenPiano');
    open = (await OpenPiano.deploy(name, symbol, maxSupply)) as OpenPiano;
    await open.deployed();
  });

  describe('constructor', () => {
    it('should configure variables correctly', async function () {
      expect(await open.name()).to.eq(name);
      expect(await open.symbol()).to.eq(symbol);
      expect(await open.maxSupply()).to.eq(maxSupply);
      expect(await open.ownerOf(TOKEN_ID_ZERO)).to.eq(await owner.getAddress());
    });
  });

  describe('setBaseMetadataURI', () => {
    beforeEach(async () => {
      await open
        .connect(owner)
        .transferFrom(
          await owner.getAddress(),
          await artist.getAddress(),
          TOKEN_ID_ZERO,
        );
    });

    it('should set new baseMetadataURI + provenance', async function () {
      await open
        .connect(artist)
        .setBaseMetadataURI(baseMetadataURI, provenance);
      expect(await open.baseMetadataURI()).to.eq(baseMetadataURI);
      expect(await open.provenance()).to.eq(provenance);
    });
    it('should not set new baseMetadataURI + provenance by rando', async function () {
      await expect(
        open.connect(rando).setBaseMetadataURI(baseMetadataURI, provenance),
      ).to.revertedWith('not owner of tokenId: 0');
    });
  });

  describe('tokenURI', () => {
    beforeEach(async () => {
      await open
        .connect(owner)
        .transferFrom(
          await owner.getAddress(),
          await artist.getAddress(),
          TOKEN_ID_ZERO,
        );
      await open
        .connect(artist)
        .mint([await receiver1.getAddress(), await receiver2.getAddress()]);
    });
    it('should return empty tokenURI if baseMetadataURI not set', async function () {
      expect(await open.tokenURI(0)).to.eq('');
      expect(await open.tokenURI(1)).to.eq('');
      expect(await open.tokenURI(2)).to.eq('');
    });
    it('should return tokenURI if baseMetadataURI is set', async function () {
      await open
        .connect(artist)
        .setBaseMetadataURI(baseMetadataURI, provenance);
      expect(await open.tokenURI(0)).to.eq(baseMetadataURI + '0');
      expect(await open.tokenURI(1)).to.eq(baseMetadataURI + '1');
      expect(await open.tokenURI(2)).to.eq(baseMetadataURI + '2');
    });
  });

  describe('mint', () => {
    beforeEach(async () => {
      await open
        .connect(owner)
        .transferFrom(
          await owner.getAddress(),
          await artist.getAddress(),
          TOKEN_ID_ZERO,
        );
    });
    it('should mint $OPEN to correct addresses', async function () {
      await open
        .connect(artist)
        .mint([await receiver1.getAddress(), await receiver2.getAddress()]);
      expect(await open.ownerOf(BigNumber.from(1))).to.eq(
        await receiver1.getAddress(),
      );
      expect(await open.ownerOf(BigNumber.from(2))).to.eq(
        await receiver2.getAddress(),
      );
    });
    it('should not mint $OPEN if by rando', async function () {
      await expect(
        open
          .connect(rando)
          .mint([await receiver1.getAddress(), await receiver2.getAddress()]),
      ).to.revertedWith('not owner of tokenId: 0');
    });
    it('should not mint $OPEN if exceeds maxSupply', async function () {
      await open
        .connect(artist)
        .mint([await receiver1.getAddress(), await receiver2.getAddress()]);
      await expect(
        open
          .connect(artist)
          .mint([await receiver1.getAddress(), await receiver2.getAddress()]),
      ).to.revertedWith('exceeded max supply');
      await open.connect(artist).mint([await receiver1.getAddress()]);
    });
  });
});
