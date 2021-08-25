import { FigureType } from './figure';

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
