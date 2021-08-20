import { memo } from "react";
import { createUseStyles } from "react-jss";
import PaperBox from "../../shared/PaperBox";

const useStyles = createUseStyles({
  wrapper: {
    height: '100%',
    padding: '16px',
    background: '#f5f5f5',
  },
});

type Props = {
  next: string;
};

function GameRightSection({ next }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <PaperBox title={'Next'} val={next}></PaperBox>
    </div>
  );
}

export default memo(GameRightSection);
