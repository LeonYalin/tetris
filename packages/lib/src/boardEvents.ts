import { BoardAction, runBoardAction } from './boardActions';
import { FigureExt, FigureRotation } from './figure';
import { KeyCode } from './keyCode';
import { getGameState, setGameState } from './state';

export function handleKeyboardEvent(keyCode: KeyCode) {
  const { board, curr, currPos, currRot } = getGameState();
  const figureExt: FigureExt = { figure: curr, figurePos: currPos, figureRot: currRot };
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
      console.log('down pressed');
      // gm.handleGameEvent(keyCode);
      break;
    }
    case KeyCode.SPACE: {
      console.log('space pressed');
      // gm.handleGameEvent(keyCode);
      break;
    }
    default:
      break;
  }
}
