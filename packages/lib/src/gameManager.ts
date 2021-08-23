import { Observable } from 'rxjs';
import { startGame, pauseGame, endGame } from './engine';

export interface GameManager {
  startGame: () => void;
  pauseGame: () => void;
  endGame: () => void;
  // gameData: Observable<Board>;
}

export function gameManager(): GameManager {
  return {
    startGame,
    pauseGame,
    endGame,
  };
}
