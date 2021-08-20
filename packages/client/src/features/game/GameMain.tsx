import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { selectGameState } from '../../store/selectors/game.selectors';
import { useAppState } from '../../store/StoreProvider';
import GameCenterSection from './GameCenterSection';
import GameLeftSection from './GameLeftSection';
import GameRightSection from './GameRightSection';

const useStyles = createUseStyles({
  wrapper: {
    height: 'calc(100% - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWrapper: {
    width: '800px',
    height: '600px',
    display: 'grid',
    gridTemplateAreas: `
    'left center right'
    `,
    gridTemplateColumns: '200px 400px 200px',
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

function GamePage() {
  const { level, score, next } = selectGameState(useAppState());
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.gameWrapper}>
        <div className={classes.left}>
          <GameLeftSection level={level} score={score}></GameLeftSection>
        </div>
        <div className={classes.center}>
          <GameCenterSection></GameCenterSection>
        </div>
        <div className={classes.right}>
          <GameRightSection next={next}></GameRightSection>
        </div>
      </div>
    </div>
  );
}

export default memo(GamePage);
