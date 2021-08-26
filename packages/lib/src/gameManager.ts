import { startGame, pauseGame, endGame } from './engine';
import { gameState$ } from './state';
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
