import { memo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { selectGameState } from '../../store/selectors/game.selectors';
import { useAppDispatch, useAppState } from '../../store/StoreProvider';
import GameCenterSection from './GameCenterSection';
import GameLeftSection from './GameLeftSection';
import GameRightSection from './GameRightSection';
import { gameManager } from '@tetris-game/lib/src';
import * as gameActions from '../../store/actions/game.actions';
import { useEffect } from 'react';
import PauseDialog from './PauseDialog';

export interface GameConfig {
  cellSize: number;
}

export const config: GameConfig = {
  cellSize: 30,
};

const useStyles = createUseStyles({
  wrapper: {
    height: 'calc(100% - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWrapper: {
    width: '660px',
    height: '600px',
    display: 'grid',
    gridTemplateAreas: `
    'left center right'
    `,
    gridTemplateColumns: '180px 300px 180px',
    gridTemplateRows: '600px',
  },
  left: {
    gridArea: 'left',
  },
  center: {
    gridArea: 'center',
  },
  right: {
    gridArea: 'right',
  },
});

const gm = gameManager.getInstance();

function GamePage() {
  const dispatch = useAppDispatch();
  const { board, level, score, next, progress } = selectGameState(useAppState());
  const classes = useStyles();
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  // const [quitDialogOpen, setQuitDialogOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', e => {
      gm.handleKeyboardEvent(e.keyCode);
    });

    gm.startGame();
    gm.gameState$.subscribe(data => {
      setTimeout(() => {
        dispatch(gameActions.setGameState(data));
      });
    });
    // eslint-disable-next-line
  }, []);

  function handlePauseClick() {
    gm.pauseGame();
    setPauseDialogOpen(true);
  }

  function handleCloseAndResume() {
    gm.resumeGame();
    setPauseDialogOpen(false);
  }

  function handleQuitClick() {
    gm.endGame();
    setPauseDialogOpen(false);
    // setQuitDialogOpen(true);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gameWrapper}>
        <div className={classes.left}>
          <GameLeftSection level={level} score={score} progress={progress}></GameLeftSection>
        </div>
        <div className={classes.center}>
          <GameCenterSection board={board} config={config}></GameCenterSection>
        </div>
        <div className={classes.right}>
          <GameRightSection
            config={config}
            next={next}
            pauseClick={handlePauseClick}
          ></GameRightSection>
        </div>
      </div>
      <PauseDialog
        open={pauseDialogOpen}
        handleClose={handleCloseAndResume}
        handleResume={handleCloseAndResume}
        handleQuit={handleQuitClick}
      ></PauseDialog>
    </div>
  );
}

export default memo(GamePage);
