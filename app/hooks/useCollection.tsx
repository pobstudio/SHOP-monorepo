import { useMemo } from 'react';
import useSWR from 'swr';
import { HASH_CONTRACT, LONDON_GIFT_CONTRACT } from '../constants';
import { fetcher } from '../utils/fetcher';
import { lowerCaseCheck } from '../utils/format';

export const COLLECTION_MAP = {
  'london-gifts': LONDON_GIFT_CONTRACT,
  'hash': HASH_CONTRACT,
};

export const usePobCollection = (account: string | undefined | null) => {
  const { data } = useSWR(
    useMemo(
      () => (!!account ? `/api/collections?owner=${account}` : null),
      [account],
    ),
    fetcher,
    {},
  );
  return useMemo(() => {
    if (!data || !account) {
      return;
    }
    return data.collection;
  }, [data, account]);
};

export const useAccountCollections = (account: string | undefined | null) => {
  const assets = usePobCollection(account);
  return useMemo(
    () => ({
      'london-gifts': assets?.filter((asset: any) =>
        lowerCaseCheck(asset?.asset_contract?.address, LONDON_GIFT_CONTRACT),
      ),
      'hash': assets?.filter((asset: any) =>
        lowerCaseCheck(asset?.asset_contract?.address, HASH_CONTRACT),
      ),
    }),
    [assets, account],
  );
};
