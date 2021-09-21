export interface EntityResponse<T> {
  code: number;
  entities?: T[];
  error?: string;
}
