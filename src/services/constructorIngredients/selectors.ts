import { TInitialState } from './slice';
import { TSliceSelectors } from '@src/types';

/* TODO:
	Осталась проблема, что приходится писать вручную типизацию для selectors
		Как автоматизировать автогенерацию? Если выносить selectors из переменной selectors, придется писать каждому selector
		типизацию. Подумать на будущее как автоматизировать это.
 */
export const selectors = {
	constructorIngredientsSelector: (state) => state,
} satisfies TSliceSelectors<TInitialState>;
