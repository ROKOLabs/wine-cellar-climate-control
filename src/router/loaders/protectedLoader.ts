import { redirect } from 'react-router';

import { AuthService } from 'features/auth/AuthService';
import { routes } from 'router/routes';

export const protectedLoader = () => {
  if (AuthService.getInstance().authenticated) return null;
  return redirect(routes.login);
};
