import { interval, Observable, repeat, Subject, take, takeUntil } from 'rxjs';
import { handleKeyboardEvent } from './boardEvents';
import { getGameState } from './gameState';
import { KeyCode } from './keyCode';

const DEFAULT_TIMEOUT = 1000;

let tick$ = new Observable<number>();
const tickActive$ = new Subject<void>();

export function startTick() {
  const { level } = getGameState();
  const timeout = Math.max(DEFAULT_TIMEOUT - level * 100, 100);
  tick$ = interval(timeout).pipe(take(1));
  tick$.pipe(repeat(), takeUntil(tickActive$)).subscribe(() => {
    handleKeyboardEvent(KeyCode.DOWN_ARROW, { dontUpdateScore: true });
  });
}

export function stopTick() {
  tickActive$.next();
}
