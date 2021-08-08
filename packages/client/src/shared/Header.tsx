import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { AppPage } from '../enums/appPage';
import styles from './Header.module.css';

type HeaderProps = {
  page: AppPage | undefined;
};

export default function Header({ page }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar className={styles.headerToolbar}>
        <div className="left">
          <img className={styles.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
        </div>
        <div className="right">
          <Button color="primary">Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
