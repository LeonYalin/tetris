import { Reducer } from 'use-immer';
import { gameInitialState, gameReducer, GameState } from './game.reducer';
import { mainInitialState, homeReducer, HomeState } from './home.reducer';

export interface Action {
  type: string | undefined;
  payload?: any;
}

export interface AppState {
  home: HomeState;
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
  home: mainInitialState,
  game: gameInitialState,
};

export const reducer = combineReducers<AppState, Action>({
  home: homeReducer,
  game: gameReducer,
});
