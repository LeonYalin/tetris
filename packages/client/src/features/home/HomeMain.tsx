import { Button } from '@material-ui/core';
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import EqualizerTwoToneIcon from '@material-ui/icons/EqualizerTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import { useHistory } from 'react-router-dom';
import { AppPage } from '../../enums/appPage';
import { MouseEvent, memo } from 'react';
import { useAppDispatch } from '../../store/StoreProvider';
import * as homeActions from '../../store/actions/home.actions';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  appLogo: {
    height: '200px',
  },
  wrapper: {
    height: 'calc(100% - 64px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    textAlign: 'center',
    fontSize: '30px',
    lineHeight: '44px',
    color: '#434343',
  },
  menuButtonWrapper: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    justifyContent: 'flex-start !important',
    width: '200px',
    margin: '5px !important',
  },
});

function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  function handleClick(e: MouseEvent<HTMLButtonElement>, page: AppPage) {
    dispatch(homeActions.setPage(page));
    history.push(`/${page}`);
  }

  return (
    <div className={classes.wrapper}>
      <div>
        <img className={classes.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
      </div>
      <div className={classes.instructions}>
        Welcome to the Tetris Game!
        <div className={classes.menuButtonWrapper}>
          <Button
            className={classes.menuButton}
            onClick={e => handleClick(e, AppPage.GAME)}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayCircleFilledTwoToneIcon />}
          >
            Start Game
          </Button>
          <Button
            className={classes.menuButton}
            onClick={e => handleClick(e, AppPage.OPTIONS)}
            variant="contained"
            color="default"
            size="large"
            startIcon={<SettingsTwoToneIcon />}
          >
            Options
          </Button>
          <Button
            className={classes.menuButton}
            onClick={e => handleClick(e, AppPage.STATS)}
            variant="contained"
            color="default"
            size="large"
            startIcon={<EqualizerTwoToneIcon />}
          >
            High Scores
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(MainPage);
