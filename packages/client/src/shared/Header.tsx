import { AppBar, Toolbar } from '@material-ui/core';
import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

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
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.headerToolbar}>
        <div className="left">
        <Link to="/">
          <img className={classes.appLogo} src="/tetris_logo.png" alt="Tetris logo" />
        </Link>
        </div>
        <div className="right"></div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(Header);
