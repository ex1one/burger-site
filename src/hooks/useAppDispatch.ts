import { AppDispatch } from '@src/types';
import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch<AppDispatch>;
