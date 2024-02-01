import { useContext } from 'react';

import { AuthServiceContext } from 'features/auth/AuthProvider';

export const useAuthService = () => useContext(AuthServiceContext);
