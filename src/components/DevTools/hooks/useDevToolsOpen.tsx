import { selectIsDevToolsOpen } from 'components/DevTools/provider/DevToolsSlice';
import { useAppSelector } from 'store/hooks';

export const useDevToolsOpen = () => useAppSelector(selectIsDevToolsOpen);
