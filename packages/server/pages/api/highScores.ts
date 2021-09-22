// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EntityResponse } from '../../../api/src';
const fs = require('fs');
const path = require('path');

export type HighScore = {
  name: string;
  score: number;
  lines: number;
  level: number;
  date: number;
  highlighted?: boolean;
};

export const DEFAULT_SCORES: HighScore[] = [
  { name: 'Leon Yalin', score: 9999, lines: 9999, level: 9999, date: 1630585684000 },
  { name: 'Joker', score: 3500, lines: 50, level: 9, date: 1630502884000 },
  { name: 'Batman', score: 2500, lines: 40, level: 7, date: 1627910884000 },
  { name: 'Superman', score: 1500, lines: 30, level: 5, date: 1599053284000 },
  { name: 'Aquaman', score: 1000, lines: 20, level: 3, date: 1314970084000 },
];

interface ResponseData extends EntityResponse<HighScore> {
  // more: 'data'
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ code: 0, entities: getScores() });
      break;
    case 'POST':
      const { score, reset } = req.body;
      const nextScores = addScore(score, reset);
      res.status(200).json({ code: 0, entities: nextScores });
      break;
    default:
      res.status(200).json({ code: 0 });
      break;
  }
}

function addScore(score: HighScore, reset: boolean) {
  const hs = JSON.parse(fs.readFileSync('./pages/highScores.json', 'utf8')) as HighScore[];
  const scores = hs && hs.length ? hs : DEFAULT_SCORES;
  const nextScores = reset ? DEFAULT_SCORES : [...scores, score].sort((a, b) => b.score - a.score);

  try {
    fs.writeFileSync('./pages/highScores.json', JSON.stringify(nextScores));
  } catch (err) {
    console.log('write error: ' + err);
  }
  return nextScores;
}

function getScores() {
  const hs = JSON.parse(fs.readFileSync('./pages/highScores.json', 'utf8')) as HighScore[];
  return hs && hs.length ? hs : DEFAULT_SCORES;
}
