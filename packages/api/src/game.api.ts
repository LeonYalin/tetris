import { EntityResponse } from '../../api/src';
import { httpGet, httpPost } from './http';
import { HighScore } from './interfaces/EntityResponse';

export async function getHighScores() {
  const res = await httpGet('api/highScores');
  return res.json() as Promise<EntityResponse<HighScore>>;
}

export async function addHighScore(score: HighScore) {
  const res = await httpPost('/api/highScores', { score });
  return res.json() as Promise<EntityResponse<HighScore>>;
}

export async function resetHighScores() {
  const res = await httpPost('/api/highScores', { reset: true });
  return res.json() as Promise<EntityResponse<HighScore>>;
}
