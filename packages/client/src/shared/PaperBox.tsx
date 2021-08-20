import { Paper } from '@material-ui/core';
import { memo } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    height: '100%',
    padding: '16px',
    background: '#f5f5f5',
  },
  levelText: {
    textTransform: 'uppercase',
  },
  levelVal: {
    padding: '5px',
    color: 'red',
  },
  paper: {
    padding: '24px 16px',
  },
});

type Props = {
  title?: string | number;
  val?: string | number;
  children?: React.ReactNode;
};

function PaperBox({ title, val, children }: Props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {title && <div className={classes.levelText}>{title}</div>}
      {String(val) && <div className={classes.levelVal}>{val}</div>}
      {children}
    </Paper>
  );
}

export default memo(PaperBox);
