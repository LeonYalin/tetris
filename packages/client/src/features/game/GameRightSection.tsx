import { memo } from "react";
import { createUseStyles } from "react-jss";
import { Figure } from "../../../../lib/src";
import PaperBox from "../../shared/PaperBox";
import { GameConfig } from "./GameMain";

const useStyles = createUseStyles({
  wrapper: {
    height: '100%',
    padding: '16px',
    background: '#f5f5f5',
  },
});

type Props = {
  config: GameConfig;
  next: Figure | null;
};

function GameRightSection({ config, next }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <PaperBox title={'Next'}>
        lalala
      </PaperBox>
    </div>
  );
}

export default memo(GameRightSection);
