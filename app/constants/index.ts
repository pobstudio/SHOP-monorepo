import { BigNumber } from 'ethers';

// env
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '1') as
  | 1
  | 4;

export const FIREBASE_ADMIN_CERT = process.env.FIREBASE_ADMIN_CERT ?? '{}';

// keys
export const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY ?? '';

export const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY ?? '';

export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ?? '';

export const ALCHEMY_KEY =
  CHAIN_ID === 1
    ? process.env.NEXT_PUBLIC_ALCHEMY_KEY
    : process.env.NEXT_PUBLIC_TEST_ALCHEMY_KEY ?? '';

export const MAINNET_ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

// constants
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MIN_BLOCK_CONFIRMATIONS = 30;

export const ZERO = BigNumber.from(0);

export const MAX_APPROVAL = BigNumber.from(2).pow(256).sub(1);

export const HASH_CONTRACT = `0xe18a32192ed95b0fe9d70d19e5025f103475d7ba`;

export const LONDON_GIFT_CONTRACT = `0x7645eec8bb51862a5aa855c40971b2877dae81af`;

export const LONDON_EMBERS_CONTRACT = `0x971fe57134d1b1b3d8d62ccadff1d2cf67e2b8ce`;

// links
export const STUDIO_PROD_LINK = 'https://pob.studio';

export const PROD_LINK = 'https://shop.pob.studio';

export const BLOG_LINK = `https://pob.mirror.xyz`;

export const TWITTER_LINK = `https://twitter.com/prrfbeauty`;

export const EMAIL_LINK = `mailto:team@pob.studio`;

export const DISCORD_LINK = `https://discord.gg/pob`;

export const OPENSEA_LINK = `https://app.singlelink.co/u/pob`;

export const GITHUB_LINK = `https://github.com/proofofbeauty/`;

export const YOUTUBE_LINK = `https://www.youtube.com/channel/UClOpMmnnEMXibEOLSj2fB2w`;

export const NFT_LICENSE_LINK = `https://www.nftlicense.org`;

export const HASH_LINK = 'https://hash.pob.studio';

export const LONDON_LINK = 'https://london.pob.studio';

export const PUBLICO_LINK = 'https://publico.pob.studio';

export const TRADE_LONDON_LINK = `https://matcha.xyz/markets/1/0x491d6b7d6822d5d4bc88a1264e1b47791fd8e904`;

export const PRINT_SERVICE_BLOG_POST = `https://pob.mirror.xyz/2dadb8skiKb5k1L7z1gVKZlnmLUK_-HOzH-lUPzpQhY`;

// SEO
export const SEO_TITLE = 'SHOP by POB';

export const SEO_DESCRIPTION = 'The home for POB merchandise and printing';

export const OG_BANNER = `${PROD_LINK}/social/print-service.jpg`;

// dimensions
export const HEADER_HEIGHT = 80;

export const MOBILE_HEADER_HEIGHT = 80;

export const FOOTER_HEIGHT = 100;

export const MOBILE_FOOTER_HEIGHT = 140;
