import { GameState } from "../../../../lib/src";

export enum ActionType {
  SET_GAME_STATE = 'SET_GAME_STATE',
  END_GAME = 'END_GAME',
}

export const setGameState = (state: GameState) => ({ type: ActionType.SET_GAME_STATE, payload: state });
export const endGame = () => ({ type: ActionType.END_GAME });
type allTypes = ReturnType<typeof setGameState> | ReturnType<typeof endGame>;
export type AllActionTypes = allTypes;
