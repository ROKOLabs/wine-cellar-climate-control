import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

export const useDevToolsVisibility = () =>
  useAppSelector((state: RootState) => state.devTools.isDevToolsOpen);
