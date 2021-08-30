import { cloneDeep } from 'lodash';
import {
  Board,
  clearLinesFromBoard,
  getFigureCellOnBoard,
  removeFigureFromBoard,
  setFigureCellOnBoardVal,
} from './board';
import { FigureType, rotateFigureCells, moveIsOutOfBounds, FigureExt, Direction, moveFigurePos, rotateIsOutOfBounds } from './figure';

export enum BoardAction {
  ADD_FIGURE,
  ROTATE,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_DOWN,
  LINE_CLEAR,
  NONE,
}

export function runBoardAction(board: Board, figureExt: FigureExt | null, action: BoardAction): [board: Board, error: boolean] {
  if (canApplyBoardAction(board, figureExt, action)) {
    const nextBoard = applyBoardAction(board, figureExt, action);
    return [nextBoard, false];
  } else {
    return [board, true];
  }
}

function canApplyBoardAction(board: Board, figureExt: FigureExt | null, action: BoardAction): boolean {
  const nextBoard = cloneDeep(board);
  if (figureExt) {
    switch (action) {
      case BoardAction.ADD_FIGURE: {
        const cells = rotateFigureCells(figureExt);
        return cells.every(cell => {
          return getFigureCellOnBoard(figureExt.figurePos, cell, nextBoard) === FigureType.EMPTY;
        });
      }
      case BoardAction.ROTATE: {
        if (rotateIsOutOfBounds(nextBoard, figureExt)) {
          return false;
        }
        removeFigureFromBoard(nextBoard, figureExt);
        const rotatedCells = rotateFigureCells(figureExt, 1);
        return rotatedCells.every(cell => {
          return getFigureCellOnBoard(figureExt.figurePos, cell, nextBoard) === FigureType.EMPTY;
        });
      }
      case BoardAction.MOVE_LEFT: {
        if (moveIsOutOfBounds(nextBoard, figureExt, Direction.LEFT)) {
          return false;
        }
        removeFigureFromBoard(nextBoard, figureExt);
        const nextFigurePos = moveFigurePos(figureExt.figurePos, Direction.LEFT);
        const cells = figureExt.figure.cells[figureExt.figureRot];
        return cells.every(cell => {
          return getFigureCellOnBoard(nextFigurePos, cell, nextBoard) === FigureType.EMPTY;
        });
      }
      case BoardAction.MOVE_RIGHT: {
        if (moveIsOutOfBounds(nextBoard, figureExt, Direction.RIGHT)) {
          return false;
        }
        removeFigureFromBoard(nextBoard, figureExt);
        const nextFigurePos = moveFigurePos(figureExt.figurePos, Direction.RIGHT);
        const cells = figureExt.figure.cells[figureExt.figureRot];
        return cells.every(cell => {
          return getFigureCellOnBoard(nextFigurePos, cell, nextBoard) === FigureType.EMPTY;
        });
      }
      case BoardAction.MOVE_DOWN: {
        if (moveIsOutOfBounds(nextBoard, figureExt, Direction.DOWN)) {
          return false;
        }
        removeFigureFromBoard(nextBoard, figureExt);
        const nextFigurePos = moveFigurePos(figureExt.figurePos, Direction.DOWN);
        const cells = figureExt.figure.cells[figureExt.figureRot];
        return cells.every(cell => {
          return getFigureCellOnBoard(nextFigurePos, cell, nextBoard) === FigureType.EMPTY;
        });
      }
      default:
        return false;
    }
  } else {
    switch (action) {
      case BoardAction.LINE_CLEAR: {
        return board.cells.some(row => row.every(cell => cell !== FigureType.EMPTY));
      }
      default:
        return false;
    }
  }
}

function applyBoardAction(board: Board, figureExt: FigureExt | null, action: BoardAction): Board {
  let nextBoard = cloneDeep(board);
  if (figureExt) {
    switch (action) {
      case BoardAction.ADD_FIGURE: {
        const cells = rotateFigureCells(figureExt);
        cells.forEach(cell => {
          setFigureCellOnBoardVal(figureExt.figurePos, cell, nextBoard, figureExt.figure.type);
        });
        break;
      }
      case BoardAction.ROTATE: {
        removeFigureFromBoard(nextBoard, figureExt);
        const rotatedCells = rotateFigureCells(figureExt, 1);
        rotatedCells.forEach(cell => {
          setFigureCellOnBoardVal(figureExt.figurePos, cell, nextBoard, figureExt.figure.type);
        });
        break;
      }
      case BoardAction.MOVE_LEFT: {
        removeFigureFromBoard(nextBoard, figureExt);
        const nextFigurePos = moveFigurePos(figureExt.figurePos, Direction.LEFT);
        const cells = figureExt.figure.cells[figureExt.figureRot];
        cells.forEach(cell => {
          setFigureCellOnBoardVal(nextFigurePos, cell, nextBoard, figureExt.figure.type);
        });
        break;
      }
      case BoardAction.MOVE_RIGHT: {
        removeFigureFromBoard(nextBoard, figureExt);
        const nextFigurePos = moveFigurePos(figureExt.figurePos, Direction.RIGHT);
        const cells = figureExt.figure.cells[figureExt.figureRot];
        cells.forEach(cell => {
          setFigureCellOnBoardVal(nextFigurePos, cell, nextBoard, figureExt.figure.type);
        });
        break;
      }
      case BoardAction.MOVE_DOWN: {
        removeFigureFromBoard(nextBoard, figureExt);
        const nextFigurePos = moveFigurePos(figureExt.figurePos, Direction.DOWN);
        const cells = figureExt.figure.cells[figureExt.figureRot];
        cells.forEach(cell => {
          setFigureCellOnBoardVal(nextFigurePos, cell, nextBoard, figureExt.figure.type);
        });
        break;
      }
      default:
        break;
    }
  } else {
    switch (action) {
      case BoardAction.LINE_CLEAR: {
        nextBoard = clearLinesFromBoard(nextBoard);
        break;
      }
      default:
        break;
    }
  }
  return nextBoard;
}
