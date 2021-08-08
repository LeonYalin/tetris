import { Button } from '@material-ui/core';
import styles from './MainPage.module.css';
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import EqualizerTwoToneIcon from '@material-ui/icons/EqualizerTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

export default function MainPage() {
  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
      </div>
      <div className={styles.instructions}>
        Welcome to the Tetris Game!
        <div className={styles.menuButtonWrapper}>
          <Button className={styles.menuButton} variant="contained" color="primary" size="large" startIcon={<PlayCircleFilledTwoToneIcon />}>
            Start Game
          </Button>
          <Button className={styles.menuButton} variant="contained" color="default" size="large" startIcon={<SettingsTwoToneIcon />}>
            Options
          </Button>
          <Button className={styles.menuButton} variant="contained" color="default" size="large" startIcon={<EqualizerTwoToneIcon />}>
            High Scores
          </Button>
        </div>
      </div>
    </div>
  );
}
