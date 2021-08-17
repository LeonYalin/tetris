export enum ActionType {
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
}

export const startGame = () => ({ type: ActionType.START_GAME });
export const endGame = () => ({ type: ActionType.END_GAME });
type allTypes = typeof startGame | typeof endGame;
export type AllActionTypes = ReturnType<allTypes>;
