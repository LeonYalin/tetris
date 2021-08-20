import { AppBar, Button, Toolbar } from '@material-ui/core';
import React, { memo } from 'react';
import { useAppState } from '../store/StoreProvider';
import { selectHomePage } from '../store/selectors/home.selectors';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  appLogo: {
    height: '30px',
  },
  headerToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function Header() {
  const page = selectHomePage(useAppState());
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.headerToolbar}>
        <div className="left">
          <img className={classes.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
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
