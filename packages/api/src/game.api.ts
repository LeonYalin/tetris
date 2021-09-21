import { HighScore } from '../../server/pages/api/highScores';
import { EntityResponse } from '../../api/src';
import { httpGet, httpPost } from './http';

export async function getHighScores() {
  const res = await httpGet('api/highScores');
  return res.json() as Promise<EntityResponse<HighScore>>;
}

export async function addHighScore(score: HighScore) {
  const res = await httpPost('/api/highScores', score);
  return res.json() as Promise<EntityResponse<HighScore>>;
}
