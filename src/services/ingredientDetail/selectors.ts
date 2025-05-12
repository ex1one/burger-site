import { TInitialState } from './slice';

import { TSliceSelectors } from '@src/types';

export const selectors = {
	ingredientDetailSelector: (state) => state.ingredient,
} satisfies TSliceSelectors<TInitialState>;
