import { memo, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import HighScores from '../../shared/HighScores';
import PaperBox from '../../shared/PaperBox';
import * as gameApi from '../../../../api/src/game.api';
import { useHistory } from 'react-router';
import { AppPage } from '../../enums/appPage';
import { Button, Snackbar } from '@material-ui/core';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import RestoreIcon from '@material-ui/icons/Restore';
import MuiAlert from '@material-ui/lab/Alert';
import { HighScore } from '../../../../api/src';

const useStyles = createUseStyles({
  wrapper: {
    height: 'calc(100% - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
  },
  highScoresWrapper: {
    width: '1000px',
    padding: '16px',
  },
  hsWrapper: {
    maxHeight: '600px',
    overflow: 'auto',
  },
  sectionRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  horSpace: {
    width: '16px',
  },
});

function HighScoresMain() {
  const history = useHistory();
  const classes = useStyles();
  const [scores, setScores] = useState<HighScore[]>([]);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    async function fetchScores() {
      const res = await gameApi.getHighScores();
      setScores(res.entities ?? []);
    }
    fetchScores();
  }, []);

  async function handleReset() {
    const data = await gameApi.resetHighScores();
    setScores(data.entities || []);
    setResetOpen(true);
  }

  function handleSnackbarClose(e?: React.SyntheticEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setResetOpen(false);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.highScoresWrapper}>
        <PaperBox title={'High scores'}>
          <HighScores scores={scores} className={classes.hsWrapper}></HighScores>
          <div className={classes.sectionRight}>
            <Button onClick={handleReset} variant="contained" color="secondary" size="large" startIcon={<RestoreIcon />}>
              Reset
            </Button>
            <div className={classes.horSpace}></div>
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
        <Snackbar open={resetOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} variant="filled" severity="success">
            Scores were successfully reset!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

export default memo(HighScoresMain);
