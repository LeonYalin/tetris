import { AppState } from '../reducers';
import { HomeState } from '../reducers/home.reducer';
import { flow } from 'lodash';

export const selectHomeState = (state: AppState) => state.home;
export const selectHomePage = flow(selectHomeState, (state: HomeState) => state.page);
