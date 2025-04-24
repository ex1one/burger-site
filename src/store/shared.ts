import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@src/types';
import { useDispatch, useSelector } from 'react-redux';
import { extraArgument } from '.';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();

export const createAppSelector = createSelector.withTypes<RootState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	extra: typeof extraArgument;
}>();
