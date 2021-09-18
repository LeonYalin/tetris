import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import PaperBox from '../../shared/PaperBox';

const useStyles = createUseStyles({
  wrapper: {
    height: 'calc(100% - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
  },
  howToPlayWrapper: {
    width: '600px',
    padding: '16px',
  },
  title: {
    textTransform: 'uppercase',
    color: '#3f51b5',
    marginRight: '5px',
  },
  section: {
    textAlign: 'left',
    color: 'slategrey',
    marginTop: '20px',
  },
});

function HowToPlayMain() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.howToPlayWrapper}>
        <PaperBox title={'How to play'}>
          <div className={classes.section}>
            <span className={classes.title}>Goal</span>- Put your organizational skills and endurance to the test by cleaning as many lines
            as possible.
          </div>
          <div className={classes.section}>
            <span className={classes.title}>Clear Lines</span>- Maneuver the falling Tetriminos to fit them together within the Matrix. To
            clear a line, fill every square within a single row.
          </div>
          <div className={classes.section}>
            <span className={classes.title}>Score Points</span>- Earn points by clearing lines. Clear multiple lines at once to increase
            your scoring opportunities.
          </div>
          <div className={classes.section}>
            <span className={classes.title}>Next Queue</span>- Preview the upcoming Tetrimino in the Next Queue to plan ahead and increase
            your scoring opportunities.
          </div>
          <div className={classes.section}>
            <span className={classes.title}>Game Over</span>- Stack the Tetriminos too high and the game is over!
          </div>
        </PaperBox>
      </div>
    </div>
  );
}

export default memo(HowToPlayMain);
