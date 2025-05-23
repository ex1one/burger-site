import { useDispatch } from 'react-redux';

import { AppDispatch } from '@src/types';

export const useAppDispatch = useDispatch<AppDispatch>;
