import { startGame, pauseGame, endGame } from './gameActions';
import { gameState$ } from './gameState';
import { handleKeyboardEvent } from './boardEvents';

function initGameManager() {
  return {
    startGame,
    pauseGame,
    endGame,
    handleKeyboardEvent,
    gameState$,
  };
}

let instance: ReturnType<typeof initGameManager> | null = null;

export const gameManager = {
  getInstance() {
    if (!instance) {
      instance = initGameManager();
    }
    return instance;
  },
};
