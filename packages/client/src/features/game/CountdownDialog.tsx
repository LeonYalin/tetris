import { Dialog } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { finalize, interval, take, tap } from 'rxjs';

const useStyles = createUseStyles({
  '@keyframes blinker': {
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(2)' },
  },
  textWrapper: {
    color: 'white',
    fontSize: '100px',
    padding: '50px',
    animationName: '$blinker',
    animationDuration: '1s',
    animationTimingFunction: 'ease-in-out;',
    animationIterationCount: ({ count }: { count: number }) => `${count}`,
  },
});

type Props = {
  texts?: string[];
  switchInterval?: number;
  open: boolean;
  handleClose: () => void;
};

function CountdownDialog(props: Props) {
  const { texts = ['3', '2', '1'], switchInterval = 1000, open, handleClose } = props;
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
      <div className={classes.textWrapper}>{currText}</div>
    </Dialog>
  );
}

export default memo(CountdownDialog);
