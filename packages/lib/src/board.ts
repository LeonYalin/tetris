export enum BoardColor {
  RED = '#FF3213',
  BROWN = '#FF971C',
  GREEN = '#72CB3B',
  BLUE = '#0341AE',
  ORANGE = '#72CB3B',
}

export const DEFAULTS = {
  size: [20, 10] as [number, number],
  cellSize: 30,
};

export interface Board {
  size: [number, number];
  cells: BoardCell[][];
}

export interface BoardCell {
  size: number;
  color: string;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getRandomColor(): BoardColor | undefined {
  const values = Object.values(BoardColor);
  const randomIndex = getRandomInt(0, values.length);
  return values.find((item, i) => i === randomIndex);
}

export function createBoardCell(size: number = DEFAULTS.cellSize, color = getRandomColor() || ''): BoardCell {
  return { size, color };
}

export function createBoard(size: [number, number] = DEFAULTS.size): Board {
  return {
    size,
    cells: Array(size[0])
      .fill(null)
      .map(() => Array(size[1]).fill(createBoardCell())),
  };
}
