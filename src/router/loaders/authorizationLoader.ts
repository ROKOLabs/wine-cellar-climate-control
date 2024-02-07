import { redirect } from 'react-router';

import { AuthService } from 'features/auth/service/AuthService';

export const authorizationLoader = () => {
  if (!AuthService.getInstance().isUserLoggedIn) return null;
  return redirect('/home');
};
