import produce from 'immer';
import { Reducer } from 'react';
import { AppState } from '.';
import { AppPage } from '../../enums/appPage';
import * as homeActions from '../actions/home.actions';

export interface HomeState {
  page: AppPage;
}

export const mainInitialState: HomeState = {
  page: AppPage.HOME,
};

export const homeReducer: Reducer<AppState, homeActions.AllActionsTypes> = (state, action) => {
  switch (action.type) {
    case homeActions.ActionType.SET_PAGE:
      return produce(state, draft => {
        draft.home.page = action.payload;
      });
    default:
      return state;
  }
};
