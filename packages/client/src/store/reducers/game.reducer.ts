import produce from 'immer';
import { Reducer } from 'react';
import { AppState } from '.';
import * as gameActions from '../actions/game.actions';

export const gameReducer: Reducer<AppState, gameActions.AllActionTypes> = (state, action) => {
  switch (action.type) {
    case gameActions.ActionType.SET_GAME_STATE:
      return produce(state, draft => {
        draft.game = (action as any).payload;
      });
    default:
      return state;
  }
};
