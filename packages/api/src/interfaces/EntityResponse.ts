export interface EntityResponse<T> {
  code: number;
  entities?: T[];
  error?: string;
}

export type HighScore = {
  name: string;
  score: number;
  lines: number;
  level: number;
  date: number;
  highlighted?: boolean;
};
