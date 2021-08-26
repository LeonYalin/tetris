import { BoardAction, BoardActionConfig, runBoardAction } from "./boardActions";
import { FigureRotation } from "./figure";
import { KeyCode } from "./keyCode";
import { getGameState, setGameState } from "./state";

export function handleKeyboardEvent(keyCode: KeyCode) {
  const { board, curr, currPos, currRot } = getGameState();
  const config: BoardActionConfig = { figure: curr, figurePos: currPos, figureRot: currRot, action: BoardAction.NONE };
  switch (keyCode as KeyCode) {
    case KeyCode.UP_ARROW:
      const [nextBoard, error] = runBoardAction(board, { ...config, action: BoardAction.ROTATE });
      if (!error) {
        const nextCurrRot = <FigureRotation>((currRot + 1) % curr.cells.length);
        setGameState({ board: nextBoard, currRot: nextCurrRot });
      }
      break;
    case KeyCode.LEFT_ARROW:
      console.log('left pressed');
      // gm.handleGameEvent(keyCode);
      break;
    case KeyCode.RIGHT_ARROW:
      console.log('right pressed');
      // gm.handleGameEvent(keyCode);
      break;
    case KeyCode.DOWN_ARROW:
      console.log('down pressed');
      // gm.handleGameEvent(keyCode);
      break;
    case KeyCode.SPACE:
      console.log('space pressed');
      // gm.handleGameEvent(keyCode);
      break;
    default:
      break;
  }
}