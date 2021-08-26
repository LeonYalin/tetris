import { cloneDeep } from 'lodash';
import { Board } from './board';
import { Figure, FigureRotation, FigureType, getFigureCellOnBoard, getFigureCells, Point, setFigureCellOnBoardVal } from './figure';

export enum BoardAction {
  ADD_FIGURE,
  ROTATE,
  MOVE_LEFT,
  MOVE_RIGHT,
  STEP_ONE_LINE,
  PUT_DOWN,
  NONE,
}

export type BoardActionConfig = { figure: Figure; figurePos: Point; figureRot: FigureRotation; action: BoardAction };

export function runBoardAction(board: Board, config: BoardActionConfig): [board: Board, error: boolean] {
  if (canApplyBoardAction(board, config)) {
    const nextBoard = applyBoardAction(board, config);
    return [nextBoard, false];
  } else {
    return [board, true];
  }
}

function canApplyBoardAction(board: Board, config: BoardActionConfig): boolean {
  const nextBoard = cloneDeep(board);
  switch (config.action) {
    case BoardAction.ADD_FIGURE: {
      const cells = getFigureCells(config.figure, config.figureRot);
      return cells.every(cell => {
        return getFigureCellOnBoard(config.figurePos, cell, nextBoard) === FigureType.EMPTY;
      });
    }
    case BoardAction.ROTATE: {
      removeFigureFromBoard(nextBoard, config);
      const rotatedCells = getFigureCells(config.figure, config.figureRot, 1);
      return rotatedCells.every(cell => {
        return getFigureCellOnBoard(config.figurePos, cell, nextBoard) === FigureType.EMPTY;
      });
    }
    default:
      return false;
  }
}

function applyBoardAction(board: Board, config: BoardActionConfig): Board {
  const nextBoard = cloneDeep(board);
  switch (config.action) {
    case BoardAction.ADD_FIGURE: {
      const cells = getFigureCells(config.figure, config.figureRot);
      cells.forEach(cell => {
        setFigureCellOnBoardVal(config.figurePos, cell, nextBoard, config.figure.type);
      });
      break;
    }
    case BoardAction.ROTATE: {
      removeFigureFromBoard(nextBoard, config);
      const rotatedPoints = getFigureCells(config.figure, config.figureRot, 1);
      rotatedPoints.forEach(cell => {
        setFigureCellOnBoardVal(config.figurePos, cell, nextBoard, config.figure.type);
      });
      break;
    }
    default:
      break;
  }
  return nextBoard;
}

function removeFigureFromBoard(board: Board, config: BoardActionConfig) {
  const points = config.figure.cells[config.figureRot];
  points.forEach(cell => {
    setFigureCellOnBoardVal(config.figurePos, cell, board, FigureType.EMPTY);
  });
}
