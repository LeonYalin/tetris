import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import PaperBox from '../../shared/PaperBox';

const useStyles = createUseStyles({
  wrapper: {
    height: '100%',
    padding: '16px',
    background: '#f5f5f5',
  },
});

type Props = {
  level: number;
  score: number;
};

function GameLeftSection({ level, score }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <PaperBox title={'Level'} val={level}></PaperBox>
      <br />
      <PaperBox title={'Score'} val={score}></PaperBox>
    </div>
  );
}

export default memo(GameLeftSection);
