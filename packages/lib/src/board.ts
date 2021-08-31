import { FigureExt, FigureType, Point } from './figure';

export const SCORE_LINES: Record<string, number> = {
  '1': 40,
  '2': 100,
  '3': 300,
  '4': 1200,
};

export const LINES_TO_LEVEL_UP = 5;

export const DEFAULTS = {
  size: [20, 10] as [number, number],
};

export interface Board {
  size: [number, number];
  cells: FigureType[][];
}

export function createBoard(size: [number, number] = DEFAULTS.size): Board {
  return {
    size,
    cells: Array(size[0])
      .fill(FigureType.EMPTY)
      .map(() => Array(size[1]).fill(FigureType.EMPTY)),
  };
}

export function getFigureCellOnBoard(figurePos: Point, figureCell: Point, board: Board) {
  return board.cells[figurePos.y + figureCell.y][figurePos.x + figureCell.x];
}

export function setFigureCellOnBoardVal(figurePos: Point, figureCell: Point, board: Board, val: FigureType) {
  board.cells[figurePos.y + figureCell.y][figurePos.x + figureCell.x] = val;
}

export function removeFigureFromBoard(board: Board, figureExt: FigureExt) {
  const points = figureExt.figure.cells[figureExt.figureRot];
  points.forEach(cell => {
    setFigureCellOnBoardVal(figureExt.figurePos, cell, board, FigureType.EMPTY);
  });
}

export function boardLineIsFull(row: FigureType[]) {
  return row.every(cell => cell !== FigureType.EMPTY);
}

export function calcBoardLinesToClear(board: Board) {
  return board.cells.reduce((acc, row) => acc + (boardLineIsFull(row) ? 1 : 0), 0);
}

export function clearLinesFromBoard(board: Board): Board {
  const nextBoard = createBoard();
  const fullIndxs = board.cells.flatMap((row, i) => (boardLineIsFull(row) ? [i] : []));
  board.cells
    .filter((row, i) => !fullIndxs.includes(i))
    .forEach((row, i) => {
      nextBoard.cells[fullIndxs.length + i] = [...row];
    });
  return nextBoard;
}

export function calcScoreByClearedLines(lines: number) {
  return SCORE_LINES[String(lines)] ?? 0;
}

export function calcLevelProgress(prevProgress: number, level: number, lines: number) {
  const nextProgress = ((lines % LINES_TO_LEVEL_UP) / LINES_TO_LEVEL_UP) * 100;
  if (nextProgress === prevProgress) {
    return [level, prevProgress];
  } else {
    const nextLevel = lines > 0 && nextProgress === 0 ? level + 1 : level;
    return [nextLevel, nextProgress];
  }
}
