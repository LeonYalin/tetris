import { AppBar, Button, Toolbar } from '@material-ui/core';
import React, { memo } from 'react';
import styles from './Header.module.css';
import { useAppState } from '../store/StoreProvider';
import { selectMainPage } from '../store/selectors/main.selectors';

// type HeaderProps = {
//   page: AppPage | undefined;
// };

function Header() {
  const page = selectMainPage(useAppState());
  return (
    <AppBar position="static">
      <Toolbar className={styles.headerToolbar}>
        <div className="left">
          <img className={styles.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
          {page}
        </div>
        <div className="right">
          <Button color="primary">Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(Header);
