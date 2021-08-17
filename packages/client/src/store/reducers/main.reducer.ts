import produce from 'immer';
import { Reducer } from 'react';
import { AppState } from '.';
import { AppPage } from '../../enums/appPage';
import * as mainActions from '../actions/main.actions';

export interface MainState {
  page: AppPage;
}

export const mainInitialState: MainState = {
  page: AppPage.MAIN,
};

export const mainReducer: Reducer<AppState, mainActions.AllActionsTypes> = (state, action) => {
  switch (action.type) {
    case mainActions.ActionType.SET_PAGE:
      return produce(state, draft => {
        draft.main.page = action.payload;
      });
    default:
      return state;
  }
};
