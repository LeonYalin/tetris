import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

export type HighScore = {
  name: string;
  score: number;
  lines: number;
  level: number;
  date: number;
  highlighted?: boolean;
};

export const highScores: HighScore[] = [
  { name: 'Leon Yalin', score: 9999, lines: 9999, level: 9999, date: 1630585684000 },
  { name: 'Joker', score: 3500, lines: 50, level: 9, date: 1630502884000 },
  { name: 'Batman', score: 2500, lines: 40, level: 7, date: 1627910884000 },
  { name: 'Superman', score: 1500, lines: 30, level: 5, date: 1599053284000 },
  { name: 'Aquaman', score: 1000, lines: 20, level: 3, date: 1314970084000 },
];

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
  current: HighScore | null;
  className: string;
};

function addCurrentScore(scores: HighScore[], current: HighScore) {
  return [...scores, current].sort((a, b) => b.score - a.score);
}

function HighScores({ current, className }: Props) {
  const classes = useStyles();
  const [scores, setScores] = useState<HighScore[]>(highScores);

  useEffect(() => {
    if (current !== null) {
      setScores(addCurrentScore(scores, current));
    }
    // eslint-disable-next-line
  }, [current]);
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
          {scores.map(hs => (
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
