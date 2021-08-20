export enum ActionType {
  INC_LEVEL = 'INC_LEVEL',
  END_GAME = 'END_GAME',
}

export const startGame = () => ({ type: ActionType.INC_LEVEL });
export const endGame = () => ({ type: ActionType.END_GAME });
type allTypes = typeof startGame | typeof endGame;
export type AllActionTypes = ReturnType<allTypes>;
