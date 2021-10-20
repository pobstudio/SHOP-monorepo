import { Record, FieldSet } from 'airtable';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import {
  PrintServiceAirtableRecordType,
  PrintServiceCollectionType,
  PrintServiceProductType,
} from '../utils/airtable';

export const usePrintQueueRecords = () => {
  const { data } = useSWR(`/api/airtable/print-queue`, fetcher);
  return useMemo(() => {
    if (!data) {
      return undefined;
    }
    return data.records;
  }, [data]);
};

export const usePrintOrdersByAccount = (account: string | undefined | null) => {
  const records = usePrintQueueRecords();
  return useMemo(() => {
    if (!records || !account) {
      return undefined;
    }
    const matches = records.filter((record: Record<FieldSet>) => {
      const entry = record?.fields['wallet'!]?.toString();
      return entry?.toLowerCase()?.includes(account?.toLowerCase());
    });
    return matches?.length > 0 ? matches : undefined;
  }, [records, account]);
};

export const usePrintOrderRecordById = (searchParams: {
  orderId: string;
  tokenId: string;
  hash: string;
}) => {
  const { orderId, tokenId, hash } = searchParams;
  const records = usePrintQueueRecords();
  return useMemo(() => {
    if (!records || !(hash || tokenId || orderId)) {
      return undefined;
    }
    const match = records.find((record: Record<FieldSet>) => {
      if (tokenId || hash) {
        const entry = record?.fields['id'!]?.toString();
        return entry?.toLowerCase()?.includes((tokenId ?? hash)?.toLowerCase());
      }
      const entry = record?.fields['id'!]?.toString();
      return entry?.toLowerCase()?.includes(hash?.toLowerCase());
    });
    return match?.id
      ? {
          ...match?.fields,
          id: match?.id,
        }
      : undefined;
  }, [records, hash]);
};

export const useNewPrintOrder = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const handleCreate = useCallback(
    async (payload: PrintServiceAirtableRecordType) => {
      if (!payload) {
        return;
      }
      if (isCreating) {
        return;
      }
      setIsCreating(true);
      const res = await fetch(`/api/airtable/new-print`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
        }),
      });
      setIsCreating(false);
      if (res.ok) {
        setCreated(true);
      }
    },
    [isCreating],
  );

  const submittingState = useMemo(() => {
    switch (true) {
      case created:
        return 'Order Created ✔️';
      case isCreating:
        return 'Creating Order...';
      default:
        return '';
    }
  }, [created, isCreating]);

  return {
    submittingState,
    handleCreate,
    isCreating,
    created,
  };
};

export const getCollectionName = (raw: string): PrintServiceCollectionType => {
  switch (true) {
    case raw.includes('london'):
      return 'LONDON GIFT';
    case raw.includes('hash'):
      return 'HASH';
    default:
      return 'LONDON GIFT';
  }
};

export const getAirtableRecordFromOpenSeaAsset = (
  asset: any, // OpenSea Object
  type: PrintServiceProductType,
  contact: string,
  shipping: string,
  txid: string,
  amountPaid: number,
): PrintServiceAirtableRecordType | undefined => {
  if (!asset) {
    return undefined;
  }
  return {
    'status': 'new',
    'wallet': asset.owner?.address,
    'tokenid': asset.token_id,
    'name': asset.name,
    'collection': getCollectionName(asset.asset_contract?.name),
    'opensea': asset.permalink,
    contact,
    shipping,
    type,
    'etherscan': `https://etherscan.io/tx/${txid}`,
    'amount paid': amountPaid,
  };
};
