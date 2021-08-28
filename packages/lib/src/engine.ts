import { createBoard } from './board';
import { createRandomFigure, FigureExt } from './figure';
import { BoardAction, runBoardAction } from './boardActions';
import { setGameState } from './state';

export function startGame() {
  console.log('game started');
  const [curr, currPos, currRot] = createRandomFigure();
  const [next] = createRandomFigure();

  const board = createBoard();
  const figureExt: FigureExt = { figure: curr, figurePos: currPos, figureRot: currRot };
  const [nextBoard, error] = runBoardAction(board, figureExt, BoardAction.ADD_FIGURE);
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
