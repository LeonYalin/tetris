import { memo, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { selectGameState } from '../../store/selectors/game.selectors';
import { useAppDispatch, useAppState } from '../../store/StoreProvider';
import GameCenterSection from './GameCenterSection';
import GameLeftSection from './GameLeftSection';
import GameRightSection from './GameRightSection';
import { gameManager, KeyCode } from '@tetris-game/lib/src';
import * as gameActions from '../../store/actions/game.actions';
import { useEffect } from 'react';
import PauseDialog from './PauseDialog';
import QuitDialog from './QuitDialog';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { AppPage } from '../../enums/appPage';
import CountdownDialog from './CountdownDialog';

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
let gameSub = new Subscription();

function GamePage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const pausedRef = useRef(false);
  const { board, level, score, lines, next, progress } = selectGameState(useAppState());
  const classes = useStyles();
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [quitDialogOpen, setQuitDialogOpen] = useState(false);
  const [countdownDialogOpen, setCountdownDialogOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && !pausedRef.current) {
        handlePauseClick();
      }
    });

    gm.startGame();
    gm.pauseGame();
    gameSub = gm.gameState$.subscribe(data => {
      if (data.gameOver) {
        handleQuitClick();
      } else {
        dispatch(gameActions.setGameState(data));
      }
    });
    setCountdownDialogOpen(true);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      gameSub.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  function handleCountdownClose() {
    gm.resumeGame();
    setCountdownDialogOpen(false);
  }

  function handlePauseClick() {
    pausedRef.current = true;
    gm.pauseGame();
    setPauseDialogOpen(true);
  }

  function handleCloseAndResume() {
    pausedRef.current = false;
    gm.resumeGame();
    setPauseDialogOpen(false);
  }

  function handleQuitClick() {
    gm.endGame();
    setPauseDialogOpen(false);
    setQuitDialogOpen(true);
  }

  function handleRestartClick() {
    pausedRef.current = false;
    gm.restartGame();
    setQuitDialogOpen(false);
  }

  function handleQuitConfirm() {
    history.push(`/${AppPage.HOME}`);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.keyCode === KeyCode.SPACE && !pausedRef.current) {
      handlePauseClick();
    } else {
      gm.handleKeyboardEvent(e.keyCode);
    }
  }

  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden' && !pausedRef.current) {
      handlePauseClick();
    }
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
          <GameRightSection config={config} next={next} pauseClick={handlePauseClick}></GameRightSection>
        </div>
      </div>
      <CountdownDialog open={countdownDialogOpen} handleClose={handleCountdownClose}></CountdownDialog>
      <PauseDialog
        open={pauseDialogOpen}
        handleClose={handleCloseAndResume}
        handleResume={handleCloseAndResume}
        handleQuit={handleQuitClick}
      ></PauseDialog>
      <QuitDialog
        open={quitDialogOpen}
        score={score}
        lines={lines}
        level={level}
        handleRestart={handleRestartClick}
        handleQuitConfirmed={handleQuitConfirm}
      ></QuitDialog>
    </div>
  );
}

export default memo(GamePage);
