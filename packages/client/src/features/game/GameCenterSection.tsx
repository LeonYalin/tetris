import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Board } from '../../../../lib/src';
import GameBoard from '../../shared/GameBoard';
import { GameConfig } from './GameMain';

const useStyles = createUseStyles({
  wrapper: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    outline: 'thick double #32a1ce',
  },
});

type Props = {
  board: Board | null;
  config: GameConfig;
};

function GameCenterSection({ board, config }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <GameBoard board={board} config={config}></GameBoard>
    </div>
  );
}

export default memo(GameCenterSection);
