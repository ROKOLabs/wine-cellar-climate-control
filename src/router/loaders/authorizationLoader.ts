import { redirect } from 'react-router';

import { store } from 'store/store';

export const authorizationLoader = () => {
  console.log('authorizationLoader', Boolean(store.getState().auth.user));

  if (!Boolean(store.getState().auth.user)) return null;

  return redirect('/home');
};
