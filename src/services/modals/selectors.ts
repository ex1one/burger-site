import { NAMES_OF_MODALS } from '@src/consts';
import { TInitialState } from './slice';
import { TSliceSelectors } from '@src/types';

export const selectors = {
	modalSelector: (state, modal: keyof typeof NAMES_OF_MODALS) => state[modal],
} satisfies TSliceSelectors<TInitialState>;
