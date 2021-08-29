import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { figuresByType, FigureType } from '../../../lib/src';

const useStyles = createUseStyles({
  wrapper: {
    width: (props: Props) => `${props.size}px`,
    height: (props: Props) => `${props.size}px`,
    background: (props: Props) => figuresByType[props.type].color,
    boxShadow: (props: Props) => (props.type === FigureType.EMPTY ? 'none' : `inset 0 0 5px rgb(0 0 0 / 50%)`),
    border: '1px solid lightgrey',
  },
});

type Props = {
  type: FigureType;
  size: number;
  style?: React.CSSProperties;
};

function FigureCell(props: Props) {
  const classes = useStyles(props);
  return <div className={classes.wrapper} style={props.style}></div>;
}

export default memo(FigureCell);
