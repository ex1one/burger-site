import { TInitialState } from './slice';
import { TSliceSelectors } from '@src/types';

export const selectors = {
	userSelector: (state) => state.user,
} satisfies TSliceSelectors<TInitialState>;
