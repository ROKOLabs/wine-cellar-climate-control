import { useContext } from 'react';

import { DbProviderContext } from 'features/db/DbProvider';

export const useDbService = () => {
  const context = useContext(DbProviderContext);
  if (!context) throw new Error('useDbService must be used within DbProvider');
  return context;
};
