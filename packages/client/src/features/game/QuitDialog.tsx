import { Button, Dialog, FormControl, InputAdornment } from '@material-ui/core';
import { memo, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReplayIcon from '@material-ui/icons/Replay';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import { GameState } from '../../../../lib/src';
import HighScores, { HighScore } from '../../shared/HighScores';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = createUseStyles({
  wrapper: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    textTransform: 'uppercase',
    color: '#3f51b5',
    marginBottom: '30px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    justifyContent: 'flex-start !important',
    width: '200px',
    margin: '5px !important',
  },
  submitButton: {
    marginLeft: '15px !important',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '30px',
  },
  hsWrapper: {
    maxHeight: '400px',
    overflow: 'auto',
  },
  formWrapper: {
    height: '70px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
  },
  submittedMsg: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9e9e9e',
  },
  nameInput: {
    width: '250px',
  },
  nameLabel: {
    left: '-14px !important',
  },
});

type Props = {
  open: boolean;
  score: GameState['score'];
  lines: GameState['lines'];
  level: GameState['level'];
  handleRestart: () => void;
  handleQuitConfirmed: () => void;
};

function QuitDialog({ open, score, lines, level, handleRestart, handleQuitConfirmed }: Props) {
  const classes = useStyles();
  const noop = () => {};
  const date = new Date().getTime();
  const [name, setName] = useState('Player');
  const [current, setCurrent] = useState<HighScore | null>(null);

  useEffect(() => {});
  return (
    <Dialog open={open} onClose={noop}>
      <div className={classes.wrapper}>
        <div className={classes.title}>Game over</div>
        <div className={classes.content}>
          <HighScores current={current} className={classes.hsWrapper}></HighScores>
          {current ? (
            <div className={classes.submittedMsg}>
              <CheckCircleTwoToneIcon style={{ marginRight: '5px' }} />
              Thank you! Your score has been submitted
            </div>
          ) : (
            <form className={classes.formWrapper} noValidate autoComplete="off">
              <FormControl variant="outlined">
                <InputLabel htmlFor="player-name" className={classes.nameLabel}>
                  Player name
                </InputLabel>
                <Input
                  autoFocus
                  id="player-name"
                  placeholder="Enter your name"
                  value={name}
                  className={classes.nameInput}
                  onChange={e => setName(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                type="submit"
                className={classes.submitButton}
                variant="outlined"
                color="primary"
                size="large"
                onClick={e => {
                  e.preventDefault();
                  setCurrent({ name, score, lines, level, date, highlighted: true });
                }}
              >
                Submit
              </Button>
            </form>
          )}
          <div className={classes.buttonsWrapper}>
            <Button
              className={classes.menuButton}
              onClick={handleRestart}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ReplayIcon />}
            >
              Restart
            </Button>
            <Button
              className={classes.menuButton}
              onClick={handleQuitConfirmed}
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<HomeTwoToneIcon />}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(QuitDialog);
