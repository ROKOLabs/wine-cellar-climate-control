import { redirect } from 'react-router';

import { AuthService } from 'features/auth/AuthService';

export const authorizationLoader = () => {
  if (!AuthService.getInstance().isUserLoggedIn) return null;
  return redirect('/home');
};
