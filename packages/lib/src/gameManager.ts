import { Observable } from 'rxjs';
import { startGame, pauseGame, endGame, GameState, gameData$ } from './engine';

export interface GameManager {
  startGame: () => void;
  pauseGame: () => void;
  endGame: () => void;
  gameData$: Observable<GameState>;
}

function initGameManager(): GameManager {
  return {
    startGame,
    pauseGame,
    endGame,
    gameData$,
  };
}

let instance: GameManager | null = null;

export const gameManager = {
  getInstance() {
    if (!instance) {
      instance = initGameManager();
    }
    return instance;
  },
};
