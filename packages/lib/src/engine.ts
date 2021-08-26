import { Board, BoardAction, createBoard } from './board';
import { BehaviorSubject, Observable } from 'rxjs';
import { Figure, createRandomFigure, Point, FigureRotation, FigureType } from './figure';
import { cloneDeep } from 'lodash';

type BoardActionConfig = { figure: Figure; figurePos: Point; figureRot: FigureRotation; action: BoardAction };

export interface GameState {
  board: Board | null;
  curr: Figure | null;
  currPos: Point | null;
  currRot: FigureRotation | null;
  next: Figure | null;
  level: number;
  score: number;
}

export const GAME_INITIAL_STATE: GameState = {
  board: null,
  curr: null,
  currPos: null,
  currRot: null,
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
  const [curr, currPos, currRot] = createRandomFigure();
  const [next] = createRandomFigure();

  const board = createBoard();
  const config: BoardActionConfig = { figure: curr, figurePos: currPos, figureRot: currRot, action: BoardAction.ADD_FIGURE };
  const passed = runBoardAction(board, config);
  setState({ board, curr, next });
}

export function pauseGame() {
  console.log('game paused');
}

export function endGame() {
  console.log('game ended');
}

function runBoardAction(board: Board, config: BoardActionConfig): boolean {
  // const newBoard = getBoardWithoutFigure(board, config);
  if (canSetFigure(board, config)) {
    setFigure(board, config);
    return true;
  } else {
    return false;
  }
}

function getBoardWithoutFigure(board: Board, config: BoardActionConfig): Board {
  const points = config.figure.points[config.figureRot];
  points.forEach(({ x, y }) => {
    board.cells[config.figurePos.x + x][config.figurePos.y + y] = FigureType.EMPTY;
  });
  return cloneDeep(board);
}

function canSetFigure(board: Board, config: BoardActionConfig): boolean {
  switch (config.action) {
    case BoardAction.ADD_FIGURE:
      const points = config.figure.points[config.figureRot];
      return points.every(({ x, y }) => {
        return board.cells[config.figurePos.x + x][config.figurePos.y + y] === FigureType.EMPTY;
      });
    default:
      return false;
  }
}

function setFigure(board: Board, config: BoardActionConfig) {
  switch (config.action) {
    case BoardAction.ADD_FIGURE:
      const points = config.figure.points[config.figureRot];
      points.forEach(({ x, y }) => {
        board.cells[config.figurePos.y + y][config.figurePos.x + x] = config.figure.type;
      });
      break;
    default:
      break;
  }
}
