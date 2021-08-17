import { Button } from '@material-ui/core';
import styles from './MainPage.module.css';
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import EqualizerTwoToneIcon from '@material-ui/icons/EqualizerTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import { useHistory } from 'react-router-dom';
import { AppPage } from '../enums/appPage';
import { MouseEvent, memo } from 'react';
import { useContext } from 'react';
import { DispatchContext } from '../store/StoreProvider';
import { setPage } from '../store/actions/main.actions';

function MainPage() {
  const history = useHistory();
  const dispatch = useContext(DispatchContext);

  function handleClick(e: MouseEvent<HTMLButtonElement>, page: AppPage) {
    dispatch(setPage(page));
    history.push(`/${page}`);
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
      </div>
      <div className={styles.instructions}>
        Welcome to the Tetris Game!
        <div className={styles.menuButtonWrapper}>
          <Button
            className={styles.menuButton}
            onClick={e => handleClick(e, AppPage.GAME)}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayCircleFilledTwoToneIcon />}
          >
            Start Game
          </Button>
          <Button
            className={styles.menuButton}
            onClick={e => handleClick(e, AppPage.OPTIONS)}
            variant="contained"
            color="default"
            size="large"
            startIcon={<SettingsTwoToneIcon />}
          >
            Options
          </Button>
          <Button
            className={styles.menuButton}
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
