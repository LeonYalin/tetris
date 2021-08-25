import { GameState } from '../../../../lib/src/engine';

export enum ActionType {
  SET_GAME_INITIAL_STATE = 'SET_GAME_INITIAL_STATE',
  END_GAME = 'END_GAME',
}

export const setGameInitialState = (state: GameState) => ({ type: ActionType.SET_GAME_INITIAL_STATE, payload: state });
export const endGame = () => ({ type: ActionType.END_GAME });
type allTypes = ReturnType<typeof setGameInitialState> | ReturnType<typeof endGame>;
export type AllActionTypes = allTypes;
