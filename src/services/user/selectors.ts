import { TInitialState } from './slice';

import { TSliceSelectors } from '@src/types';

export const selectors = {
	userSelector: (state) => state.user,
	errorSelector: (state) => state.error,
} satisfies TSliceSelectors<TInitialState>;
