import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@src/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
