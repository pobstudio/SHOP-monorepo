import { BigNumber } from 'ethers';

// constants
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MIN_BLOCK_CONFIRMATIONS = 30;

export const ZERO = BigNumber.from(0);

// env
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '1');

export const ALCHEMY_KEY =
  CHAIN_ID === 1
    ? process.env.NEXT_PUBLIC_ALCHEMY_KEY
    : process.env.NEXT_PUBLIC_TEST_ALCHEMY_KEY ?? '';

// links
export const STUDIO_PROD_LINK = 'https://pob.studio';

export const PROD_LINK = 'https://shop.pob.studio';

export const BLOG_LINK = `https://pob.mirror.xyz`;

export const TWITTER_LINK = `https://twitter.com/prrfbeauty`;

export const DISCORD_LINK = `https://discord.gg/x4SH5pGgvj`;

export const NFT_LICENSE_LINK = `https://www.nftlicense.org`;

export const HASH_LINK = 'https://hash.pob.studio';

export const LONDON_LINK = 'https://london.pob.studio';

export const PUBLICO_LINK = 'https://publico.pob.studio';

// SEO
export const SEO_TITLE = 'SHOP by POB';

export const SEO_DESCRIPTION = 'The home for POB merchandise and printing';

export const OG_BANNER = `${PROD_LINK}/banner/default.png`;

// dimensions
export const HEADER_HEIGHT = 80;

export const MOBILE_HEADER_HEIGHT = 80;

export const FOOTER_HEIGHT = 100;

export const MOBILE_FOOTER_HEIGHT = 140;
