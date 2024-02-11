import { createContext } from 'react';

import { AuthService } from 'features/auth/AuthService';

export const AuthServiceContext = createContext<AuthService | null>(null);
