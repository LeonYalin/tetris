import { Button } from '@material-ui/core';
import { PauseCircleOutline } from '@material-ui/icons';
import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Figure } from '../../../../lib/src';
import BoardFigure from '../../shared/BoardFigure';
import PaperBox from '../../shared/PaperBox';
import { GameConfig } from './GameMain';

const useStyles = createUseStyles({
  wrapper: {
    height: '100%',
    padding: '16px',
    background: '#f5f5f5',
  },
  figureWrapper: {
    height: '145px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    justifyContent: 'flex-start !important',
    width: '146px',
    marginTop: '16px !important',
  },
});

type Props = {
  config: GameConfig;
  next: Figure;
  pauseClick: () => void;
};

function GameRightSection({ config, next, pauseClick }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <PaperBox title={'Next'}>
        <div className={classes.figureWrapper}>
          <BoardFigure figure={next} config={config}></BoardFigure>
        </div>
      </PaperBox>
      <Button
        className={classes.menuButton}
        onClick={pauseClick}
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<PauseCircleOutline />}
      >
        Pause
      </Button>
    </div>
  );
}

export default memo(GameRightSection);
