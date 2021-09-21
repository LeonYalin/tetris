import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { memo } from 'react';
import { createUseStyles } from 'react-jss';
import { HighScore } from '../../../server/pages/api/highScores';

const useStyles = createUseStyles({
  table: {
    minWidth: 500,
  },
  bold: {
    fontWeight: '700 !important',
  },
  highlighted: {
    background: '#ffeb3b',
  },
});

type Props = {
  scores: HighScore[];
  className: string;
};

function HighScores({ scores, className }: Props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={className ? className : ''}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.bold}>Player name</TableCell>
            <TableCell className={classes.bold} align="right">
              Score
            </TableCell>
            <TableCell className={classes.bold} align="right">
              Lines
            </TableCell>
            <TableCell className={classes.bold} align="right">
              Level
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores && scores.map(hs => (
            <TableRow key={hs.date} className={hs.highlighted === true ? classes.highlighted : 'lala'}>
              <TableCell>{hs.name}</TableCell>
              <TableCell align="right">{hs.score}</TableCell>
              <TableCell align="right">{hs.lines}</TableCell>
              <TableCell align="right">{hs.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(HighScores);
