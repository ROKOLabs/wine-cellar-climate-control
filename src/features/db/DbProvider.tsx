import { ReactNode, createContext, useState } from 'react';

import { DbService } from 'features/db/DbService';

export const DbProviderContext = createContext<DbService | null>(null);

type DbProviderProps = {
  children: ReactNode;
};

export const DbProvider = ({ children }: DbProviderProps) => {
  const [dbService] = useState(() => DbService.getInstance());
  return (
    <DbProviderContext.Provider value={dbService}>
      {children}
    </DbProviderContext.Provider>
  );
};
