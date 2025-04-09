import { RootState } from '@src/store';
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
