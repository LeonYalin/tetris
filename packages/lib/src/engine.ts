import { createBoard } from './board';
import { createRandomFigure } from './figure';
import { BoardAction, BoardActionConfig, runBoardAction } from './boardActions';
import { setGameState } from './state';

export function startGame() {
  console.log('game started');
  const [curr, currPos, currRot] = createRandomFigure();
  const [next] = createRandomFigure();

  const board = createBoard();
  const config: BoardActionConfig = { figure: curr, figurePos: currPos, figureRot: currRot, action: BoardAction.ADD_FIGURE };
  const [nextBoard, error] = runBoardAction(board, config);
  if (!error) {
    setGameState({ board: nextBoard, curr, next, currPos, currRot });
  }
}

export function pauseGame() {
  console.log('game paused');
}

export function endGame() {
  console.log('game ended');
}
