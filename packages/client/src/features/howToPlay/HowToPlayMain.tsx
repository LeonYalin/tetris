import { Button } from '@material-ui/core';
import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import PaperBox from '../../shared/PaperBox';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import { AppPage } from '../../enums/appPage';
import { useHistory } from 'react-router';

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
  sectionRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
});

function HowToPlayMain() {
  const history = useHistory();
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
          <div className={classes.sectionRight}>
            <Button
              onClick={e => history.push(`/${AppPage.HOME}`)}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<HomeTwoToneIcon />}
            >
              Home
            </Button>
          </div>
        </PaperBox>
      </div>
    </div>
  );
}

export default memo(HowToPlayMain);
