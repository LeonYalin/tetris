import { Reducer } from 'use-immer';
import { gameInitialState, gameReducer, GameState } from './game.reducer';
import { mainInitialState, mainReducer, MainState } from './main.reducer';

export interface Action {
  type: string | undefined;
  payload?: any;
}

export interface AppState {
  main: MainState;
  game: GameState;
}

const combineReducers = <S, A>(reducers: { [key: string]: Reducer }): ((state: S, action: A) => S) => {
  return (state: S, action: A) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        // @ts-ignore
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};

export const appInitialState: AppState = {
  main: mainInitialState,
  game: gameInitialState,
};

export const reducer = combineReducers<AppState, Action>({
  main: mainReducer,
  game: gameReducer,
});
