import { TInitialState } from './slice';

import { TSliceSelectors } from '@src/types';

export const selectors = {
	orderSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
