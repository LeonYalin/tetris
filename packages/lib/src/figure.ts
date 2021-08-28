import { Board } from './board';
import { getRandomInt } from './util';

export type Point = { x: number; y: number };

export enum FigureType {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
  EMPTY = '-',
}

export type FigureRotation = 0 | 1 | 2 | 3;

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface Figure {
  type: FigureType;
  color: string;
  cells: [Point[], Point[], Point[], Point[]];
}

export interface FigureExt {
  figure: Figure;
  figurePos: Point;
  figureRot: FigureRotation;
}

export const figuresByType: Record<FigureType, Figure> = {
  [FigureType.I]: {
    type: FigureType.I,
    color: 'cyan',
    cells: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ],
      [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ],
    ],
  },
  [FigureType.J]: {
    type: FigureType.J,
    color: 'blue',
    cells: [
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
      ],
    ],
  },
  [FigureType.L]: {
    type: FigureType.L,
    color: 'orange',
    cells: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  [FigureType.O]: {
    type: FigureType.O,
    color: 'yellow',
    cells: [
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ],
    ],
  },
  [FigureType.S]: {
    type: FigureType.S,
    color: 'green',
    cells: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  [FigureType.T]: {
    type: FigureType.T,
    color: 'purple',
    cells: [
      [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  [FigureType.Z]: {
    type: FigureType.Z,
    color: 'red',
    cells: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 2 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
      ],
    ],
  },
  [FigureType.EMPTY]: {
    type: FigureType.EMPTY,
    color: 'transparent',
    cells: [[], [], [], []],
  },
};

export function createRandomFigure(): [Figure, Point, FigureRotation] {
  const values = Object.values(FigureType);
  const i = getRandomInt(0, values.length);
  return [figuresByType[values[i]], { x: 3, y: 0 }, 0];
}

export function rotateFigureCells(figureExt: FigureExt) {
  return figureExt.figure.cells[figureExt.figureRot % figureExt.figure.cells.length];
}

export function moveIsOutOfBounds(board: Board, figureExt: FigureExt, direction: Direction) {
  const cells = figureExt.figure.cells[figureExt.figureRot];
  const xCoords = cells.map(cell => cell.x);
  const minX = figureExt.figurePos.x + Math.min(...xCoords);
  const maxX = figureExt.figurePos.x + Math.max(...xCoords);
  return direction === Direction.LEFT ? minX - 1 < 0 : maxX + 1 >= board.size[1];
}

export function moveFigurePos(figurePos: Point, direction: Direction): Point {
  return {
    x: figurePos.x + (direction === Direction.LEFT ? -1 : 1),
    y: figurePos.y,
  };
}

export function getFigureCellOnBoard(figurePos: Point, figureCell: Point, board: Board) {
  return board.cells[figurePos.y + figureCell.y][figurePos.x + figureCell.x];
}

export function setFigureCellOnBoardVal(figurePos: Point, figureCell: Point, board: Board, val: FigureType) {
  board.cells[figurePos.y + figureCell.y][figurePos.x + figureCell.x] = val;
}
