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

export const PROD_LINK = 'https://publico.pob.studio';

export const BLOG_LINK = `https://pobstudio.substack.com`;

export const TWITTER_LINK = `https://twitter.com/prrfbeauty`;

export const DISCORD_LINK = `https://discord.gg/x4SH5pGgvj`;

export const NFT_LICENSE_LINK = `https://www.nftlicense.org`;

// SEO
export const SEO_TITLE = 'PUBLICO by POB';

export const SEO_DESCRIPTION = 'A series of studies on public ownership';

export const OG_BANNER = `${PROD_LINK}/banner/default.png`;
