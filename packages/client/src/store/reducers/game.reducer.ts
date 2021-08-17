import produce from 'immer';
import { Reducer } from 'react';
import { AppState } from '.';
import * as gameActions from '../actions/game.actions';

export interface GameState {
  started: boolean;
}

export const gameInitialState: GameState = {
  started: false,
};

export const gameReducer: Reducer<AppState, gameActions.AllActionTypes> = (state, action) => {
  switch (action.type) {
    case gameActions.ActionType.START_GAME:
      return produce(state, draft => {
        draft.game.started = true;
      });
    case gameActions.ActionType.END_GAME:
      return produce(state, draft => {
        draft.game.started = true;
      });
    default:
      return state;
  }
};
