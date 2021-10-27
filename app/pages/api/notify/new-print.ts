import { deployments, PrintService__factory } from '@pob/protocol';
import { NextApiRequest, NextApiResponse } from 'next';
import { CHAIN_ID } from '../../../constants';
import { PROVIDER } from '../../../constants/providers';

const printServiceContract = PrintService__factory.connect(
  deployments[CHAIN_ID].printService,
  PROVIDER,
);

const handleNotify = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const activity = body?.activity;

  if (!activity || activity?.length < 1) {
    res.status(200).json({
      statusCode: 200,
    });
    return;
  }

  console.log(activity, 'activity');

  const tokenTransferActivity = activity.filter(
    (a: any) => a.category === 'token' && a.asset === 'LONDON',
  );
  const transactionIds = tokenTransferActivity.map((a: any) => a.hash);

  for (const txid of transactionIds) {
    const receipt = await PROVIDER.getTransactionReceipt(txid);
    console.log(receipt.logs, 'receipt.logs');
    // const printOrdersReceived = receipt.logs.filter(
    //   (l) =>
    //     l.topics[0] ===
    //     '0x044bd17d60a80f68fbbeaf80d405c51fc0254ddecb9dcec4054d350e2bb147fb',
    // );
    // const decodedUpdates = updates.map((u) =>
    //   hashRegistry.interface.decodeEventLog('UpdatedRegistry', u.data),
    // );
    // const orderIds = printOrdersReceived
    //   .map((l) => l.topics[1])
    //   .map((m) => m.slice(-40));
    // const tokenIds = printOrdersReceived.map(
    //   (t) => erc1155.interface.decodeEventLog('TransferSingle', t.data)[3],
    // );
    // const txHashes = tokenIds.map(
    //   (t) =>
    //     decodedUpdates.find((u) => u[0].toHexString() === t.toHexString())?.[1],
    // );

    // for (let i = 0; i < printOrdersReceived.length; ++i) {
    // const hash = txHashes[i].toHexString();
    // const accountName = await useNamePure(minters[i], PROVIDER);
    // const message = new MessageEmbed()
    //   .setColor('#d5dbb3')
    //   .setTitle(`New mint: ${accountName}`)
    //   .setURL(`${'https://hash.pob.studio'}/art/${hash}`)
    //   .setAuthor(accountName)
    //   .addField('Tx hash', hash)
    //   .addField(
    //     'Minter Type',
    //     getMinterTypeFromTokenId(tokenIds[i].toHexString())?.toUpperCase(),
    //     true,
    //   )
    //   .addField(
    //     'Season',
    //     getSeasonFromTokenId(tokenIds[i].toHexString())?.toUpperCase(),
    //     true,
    //   )
    //   .setTimestamp()
    //   .setThumbnail(getArtworkPreviewUrl(hash));
    // PostTweet(
    //   `* NEW HASH MINT *\n` +
    //     `${getHashTagFromType(
    //       getMinterTypeFromTokenId(tokenIds[i].toHexString()) ?? '',
    //     )} mint by ${accountName} !\n` +
    //     `< via @prrfbeauty >\n` +
    //     `${'https://hash.pob.studio'}/art/${hash}`,
    //   'HASH_MINTS',
    // );
    // await mintingClient.send(message);
    // }
  }
  res.status(200).json({
    statusCode: 200,
  });
};

export default handleNotify;
