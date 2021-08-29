import { memo, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Figure, FigureType, Point } from '../../../lib/src';
import { GameConfig } from '../features/game/GameMain';
import FigureCell from './FigureCell';

const useStyles = createUseStyles({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
});

type Props = {
  figure: Figure;
  config: GameConfig;
};

function arrValues(cells: Point[], prop: 'x' | 'y') {
  const max = Math.max(...cells.map(cell => cell[prop]), 0);
  return [...Array(max + 1)];
}

function cellExists(cells: Point[], x: number, y: number) {
  console.log(cells, x, y);

  return cells.find(cell => cell.x === x && cell.y === y);
}

function BoardFigure({ figure, config }: Props) {
  const classes = useStyles();
  const xValues = useMemo(() => arrValues(figure.cells[0], 'x').fill('x'), [figure]);
  const yValues = useMemo(() => arrValues(figure.cells[0], 'y').fill('y'), [figure]);
  const emptyCellStyles: React.CSSProperties = { border: 'none' };

  return (
    <>
      {figure &&
        xValues.map((y, i) => (
          <div className={classes.row} key={`row-${i}`}>
            {yValues.map((x, j) =>
              cellExists(figure.cells[0], i, j) ? (
                <FigureCell type={figure.type} size={config.cellSize} key={`cell-${j}`}></FigureCell>
              ) : (
                <FigureCell type={FigureType.EMPTY} size={config.cellSize} key={`cell-${j}`} style={emptyCellStyles}></FigureCell>
              ),
            )}
          </div>
        ))}
    </>
  );
}

export default memo(BoardFigure);
