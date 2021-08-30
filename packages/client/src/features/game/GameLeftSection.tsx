import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import PaperBox from '../../shared/PaperBox';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = createUseStyles({
  wrapper: {
    height: '100%',
    padding: '16px',
    background: '#f5f5f5',
  },
  progressWrapper: {
    marginTop: '10px',
  },
});

type Props = {
  level: number;
  score: number;
  progress: number;
};

function GameLeftSection({ level, score, progress }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <PaperBox title={'Level'} val={level}>
        <div className={classes.progressWrapper}>
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </PaperBox>
      <br />
      <PaperBox title={'Score'} val={score}></PaperBox>
    </div>
  );
}

export default memo(GameLeftSection);
