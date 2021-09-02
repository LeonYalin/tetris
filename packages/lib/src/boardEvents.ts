import { calcBoardLinesToClear, calcLevelProgress, calcScoreByClearedLines } from './board';
import { BoardAction, runBoardAction } from './boardActions';
import { createDefaultFigurePos, createDefaultFigureRot, createRandomFigure, extendFigure, FigureExt, FigureRotation } from './figure';
import { KeyCode } from './keyCode';
import { getGameState, setGameState } from './gameState';
import { startTick, stopTick } from './gameUpdate';

export type KeyboardEventConfig = { dontUpdateScore: boolean };
const DEFAULT_CONFIG: KeyboardEventConfig = {
  dontUpdateScore: false,
};

export function handleKeyboardEvent(keyCode: KeyCode, config: KeyboardEventConfig = DEFAULT_CONFIG) {
  const { board, curr, currPos, currRot } = getGameState();
  const figureExt = extendFigure(curr, currPos, currRot);
  switch (keyCode as KeyCode) {
    case KeyCode.UP_ARROW: {
      const [nextBoard, error] = runBoardAction(board, figureExt, BoardAction.ROTATE);
      if (!error) {
        const nextCurrRot = <FigureRotation>((currRot + 1) % curr.cells.length);
        setGameState({ board: nextBoard, currRot: nextCurrRot });
      }
      break;
    }
    case KeyCode.LEFT_ARROW: {
      const [nextBoard, error] = runBoardAction(board, figureExt, BoardAction.MOVE_LEFT);
      if (!error) {
        const nextPos = { x: currPos.x - 1, y: currPos.y };
        setGameState({ board: nextBoard, currPos: nextPos });
      }
      break;
    }
    case KeyCode.RIGHT_ARROW: {
      const [nextBoard, error] = runBoardAction(board, figureExt, BoardAction.MOVE_RIGHT);
      if (!error) {
        const nextPos = { x: currPos.x + 1, y: currPos.y };
        setGameState({ board: nextBoard, currPos: nextPos });
      }
      break;
    }
    case KeyCode.DOWN_ARROW: {
      stopTick();
      const [nextBoard, error] = runBoardAction(board, figureExt, BoardAction.MOVE_DOWN);
      if (!error) {
        const nextPos = { x: currPos.x, y: currPos.y + 1 };
        const { score } = getGameState();
        setGameState({ board: nextBoard, currPos: nextPos, score: config.dontUpdateScore ? score : score + 1 });
      } else {
        const { next, lines, score, level, progress } = getGameState();
        const [clearedBoard] = runBoardAction(board, null, BoardAction.LINE_CLEAR);
        const clearedLines = calcBoardLinesToClear(board);
        const newLines = lines + clearedLines;
        const newScore = score + calcScoreByClearedLines(clearedLines);
        const [newLevel, newProgress] = calcLevelProgress(progress, level, newLines);

        const figureExt = extendFigure(next, createDefaultFigurePos(), createDefaultFigureRot());
        const [nextBoard, error] = runBoardAction(clearedBoard, figureExt, BoardAction.ADD_FIGURE);
        const [newNext] = createRandomFigure();
        if (!error) {
          setGameState({
            board: nextBoard,
            curr: next,
            next: newNext,
            currPos: figureExt.figurePos,
            currRot: figureExt.figureRot,
            lines: newLines,
            score: newScore,
            progress: newProgress,
            level: newLevel,
          });
        } else {
          stopTick();
          setGameState({ gameOver: true });
        }
      }
      startTick();
      break;
    }
    default:
      break;
  }
}
