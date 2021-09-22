import { Dialog } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { finalize, interval, take, tap } from 'rxjs';

const animDur = 1; // seconds

const useStyles = createUseStyles({
  '@keyframes blinker': {
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(2)' },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '300px',
    height: '300px',
  },
  textWrapper: {
    color: 'white',
    fontSize: '100px',
    animationName: '$blinker',
    animationDuration: `${animDur}s`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: ({ count }: { count: number }) => `${count}`,
  },
});

type Props = {
  texts?: string[];
  switchInterval?: number;
  open: boolean;
  onClose: () => void;
};

function CountdownDialog(props: Props) {
  const { texts = ['3', '2', '1'], switchInterval = animDur * 1000, open, onClose: handleClose } = props;
  const classes = useStyles({ count: texts.length, theme: undefined });
  const [currText, setCurrText] = useState(texts[0] || '');
  useEffect(() => {
    interval(switchInterval)
      .pipe(
        take(texts.length),
        tap(num => setCurrText(texts[num + 1])),
        finalize(() => handleClose()),
      )
      .subscribe();
    // eslint-disable-next-line
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <div className={classes.wrapper}>
      <div className={classes.textWrapper}>{currText}</div>
      </div>
    </Dialog>
  );
}

export default memo(CountdownDialog);
