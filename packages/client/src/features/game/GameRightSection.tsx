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
    margin: '20px 0',
  },
});

type Props = {
  config: GameConfig;
  next: Figure;
};

function GameRightSection({ config, next }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <PaperBox title={'Next'}>
        <div className={classes.figureWrapper}>
          <BoardFigure figure={next} config={config}></BoardFigure>
        </div>
      </PaperBox>
    </div>
  );
}

export default memo(GameRightSection);
