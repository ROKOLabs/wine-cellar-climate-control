import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider = (props: StoreProviderProps) => (
  <Provider store={store}>{props.children}</Provider>
);
