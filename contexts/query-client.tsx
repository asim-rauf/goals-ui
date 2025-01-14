'use client';
import { TIME_IN_MILLISECONDS } from '@/constants';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React, { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: TIME_IN_MILLISECONDS['24_HOURS'],
      refetchInterval: TIME_IN_MILLISECONDS['24_HOURS'],
      throwOnError: true,
      retry: false,
    },
  },
});
const persister = createSyncStoragePersister({
  storage: typeof window === 'undefined' ? undefined : window.localStorage,
});

const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default ReactQueryClientProvider;
