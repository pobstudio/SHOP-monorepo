import { BigNumber } from 'ethers';

// env
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '1');

export const FIREBASE_ADMIN_CERT = process.env.FIREBASE_ADMIN_CERT ?? '{}';

// keys
export const OPENSEA_API_KEY = 'fc09ae6245fb40ab8afbcff451553345';

export const AIRTABLE_API_KEY = `keynNuQm3SaErRWib`;

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

// links
export const STUDIO_PROD_LINK = 'https://pob.studio';

export const PROD_LINK = 'https://shop.pob.studio';

export const BLOG_LINK = `https://pob.mirror.xyz`;

export const TWITTER_LINK = `https://twitter.com/prrfbeauty`;

export const DISCORD_LINK = `https://discord.gg/x4SH5pGgvj`;

export const OPENSEA_LINK = `https://app.singlelink.co/u/pob`;

export const GITHUB_LINK = `https://github.com/proofofbeauty/`;

export const YOUTUBE_LINK = `https://www.youtube.com/channel/UClOpMmnnEMXibEOLSj2fB2w`;

export const NFT_LICENSE_LINK = `https://www.nftlicense.org`;

export const HASH_LINK = 'https://hash.pob.studio';

export const LONDON_LINK = 'https://london.pob.studio';

export const PUBLICO_LINK = 'https://publico.pob.studio';

// SEO
export const SEO_TITLE = 'SHOP by POB';

export const SEO_DESCRIPTION = 'The home for POB merchandise and printing';

export const OG_BANNER = `${PROD_LINK}/social/print-service.png`;

// dimensions
export const HEADER_HEIGHT = 80;

export const MOBILE_HEADER_HEIGHT = 80;

export const FOOTER_HEIGHT = 100;

export const MOBILE_FOOTER_HEIGHT = 140;
