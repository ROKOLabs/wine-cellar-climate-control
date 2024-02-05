import { redirect } from 'react-router';

import { store } from 'store/store';

export const protectedLoader = () => {
  console.log('protectedLoader', Boolean(store.getState().auth.user));

  if (Boolean(store.getState().auth.user)) return null;

  return redirect('/login');
};
