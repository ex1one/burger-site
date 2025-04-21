import { TInitialState } from './slice';
import { TSliceSelectors } from '@src/types';

export const selectors = {
	ingredientsSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
