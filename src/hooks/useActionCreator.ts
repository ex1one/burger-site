import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from '.';

export const useActionCreator = (actions: ActionCreatorsMapObject) => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(actions, dispatch), []);
};
