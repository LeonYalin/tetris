import produce from 'immer';
import { Reducer } from 'react';
import { AppState } from '.';
import * as gameActions from '../actions/game.actions';

export interface GameState {
  level: number;
  score: number;
  next: string;
}

export const gameInitialState: GameState = {
  level: 1,
  score: 0,
  next: 'Figure ^',
};

export const gameReducer: Reducer<AppState, gameActions.AllActionTypes> = (state, action) => {
  switch (action.type) {
    case gameActions.ActionType.INC_LEVEL:
      return produce(state, draft => {
        draft.game.level += 1;
      });
    default:
      return state;
  }
};
