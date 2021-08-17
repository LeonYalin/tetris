import { AppState } from '../reducers';
import { MainState } from '../reducers/main.reducer';
import { flow } from 'lodash';

export const selectMain = (state: AppState) => state.main;
export const selectMainPage = flow(selectMain, (state: MainState) => state.page);
