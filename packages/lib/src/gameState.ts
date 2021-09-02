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
  lines: number;
  progress: number;
  gameOver: boolean;
}

export const GAME_INITIAL_STATE: GameState = {
  board: { size: [0, 0], cells: [[]] },
  next: figuresByType[FigureType.EMPTY],
  curr: figuresByType[FigureType.EMPTY],
  currPos: { x: 0, y: 0 },
  currRot: 0,
  level: 1,
  score: 0,
  lines: 0,
  progress: 0,
  gameOver: false,
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

export function resetGameState() {
  setGameState({ ...GAME_INITIAL_STATE });
}
