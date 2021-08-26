import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from './board';
import { Figure, FigureRotation, figuresByType, FigureType, Point } from './figure';

export interface GameState {
  board: Board;
  curr: Figure;
  currPos: Point;
  currRot: FigureRotation;
  next: Figure;
  level: number;
  score: number;
}

export const GAME_INITIAL_STATE: GameState = {
  board: { size: [0, 0], cells: [[]] },
  curr: figuresByType[FigureType.EMPTY],
  currPos: { x: 0, y: 0 },
  currRot: 0,
  next: figuresByType[FigureType.EMPTY],
  level: 1,
  score: 0,
};

const state$ = new BehaviorSubject<GameState>(GAME_INITIAL_STATE);
export const gameState$: Observable<GameState> = state$.asObservable();

export function getGameState() {
  return state$.value;
}

export function setGameState(nextState: Partial<GameState>) {
  state$.next({
    ...state$.value,
    ...nextState,
  });
}
