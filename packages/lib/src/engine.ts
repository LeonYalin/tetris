import { Board, createBoard } from './board';
import { BehaviorSubject, Observable } from 'rxjs';
import { Figure, createRandomFigure } from './figure';

export interface GameState {
  board: Board | null;
  curr: Figure | null;
  next: Figure | null;
  level: number;
  score: number;
}

export const GAME_INITIAL_STATE: GameState = {
  board: null,
  curr: null,
  next: null,
  level: 1,
  score: 0,
};

const state$ = new BehaviorSubject<GameState>(GAME_INITIAL_STATE);
export const gameData$: Observable<GameState> = state$.asObservable();

function setState(nextState: Partial<GameState>) {
  state$.next({
    ...state$.value,
    ...nextState,
  });
}

export function startGame() {
  console.log('game started');
  setState({
    board: createBoard(),
    curr: createRandomFigure(),
    next: createRandomFigure(),
  });
}

export function pauseGame() {
  console.log('game paused');
}

export function endGame() {
  console.log('game ended');
}
