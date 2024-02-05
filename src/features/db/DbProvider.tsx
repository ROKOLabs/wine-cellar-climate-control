import { createContext } from 'react';

import { DbService } from './DbService';

export const DbProviderContext = createContext<DbService | null>(null);

export const DbProvider = ({ children }: { children: React.ReactNode }) => (
  <DbProviderContext.Provider value={DbService.getInstance()}>
    {children}
  </DbProviderContext.Provider>
);
