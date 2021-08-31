import { createBoard } from './board';
import { createRandomFigure, extendFigure } from './figure';
import { BoardAction, runBoardAction } from './boardActions';
import { setGameState } from './gameState';
import { startTick, stopTick } from './gameUpdate';

export function startGame() {
  const [curr, currPos, currRot] = createRandomFigure();
  const [next] = createRandomFigure();
  const board = createBoard();
  const figureExt = extendFigure(curr, currPos, currRot);
  const [nextBoard, error] = runBoardAction(board, figureExt, BoardAction.ADD_FIGURE);
  if (!error) {
    setGameState({ board: nextBoard, curr, next, currPos, currRot });
  }
  startTick();
}

export function pauseGame() {
  stopTick();
}

export function resumeGame() {
  startTick();
}

export function endGame() {
  stopTick();
}
