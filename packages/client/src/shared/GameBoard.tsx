import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Board } from '../../../lib/src';
import { GameConfig } from '../features/game/GameMain';
import FigureCell from './FigureCell';

const useStyles = createUseStyles({
  row: {
    display: 'flex',
  },
});

type Props = {
  board: Board | null;
  config: GameConfig;
};

function GameBoard({ board, config }: Props) {
  const classes = useStyles();
  return (
    <>
      {board &&
        board.cells.map((row, i) => {
          return (
            <div className={classes.row} key={`row-${i}`}>
              {row.map((cell, j) => (
                <FigureCell type={cell} size={config.cellSize} key={`cell-${j}`}></FigureCell>
              ))}
            </div>
          );
        })}
    </>
  );
}

export default memo(GameBoard);
