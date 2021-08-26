import { FigureType } from './figure';

export const DEFAULTS = {
  size: [20, 10] as [number, number],
};

export interface Board {
  size: [number, number];
  cells: FigureType[][];
}

export enum BoardAction {
  ADD_FIGURE,
  MOVE_LEFT,
  MOVE_RIGHT,
  ROTATE_LEFT,
  ROTATE_RIGHT,
  STEP_ONE_LINE,
  PUT_DOWN,
}

export function createBoard(size: [number, number] = DEFAULTS.size): Board {
  return {
    size,
    cells: Array(size[0])
      .fill(FigureType.EMPTY)
      .map(() => Array(size[1]).fill(FigureType.EMPTY)),
  };
}
