import { memo } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    background: 'lightblue',
    outline: 'thick double #32a1ce',
  }
})

function GameCenterSection() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      Center
    </div>
  );
}

export default memo(GameCenterSection);
