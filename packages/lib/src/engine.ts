import { Board, createBoard } from "./board";
import { BehaviorSubject } from 'rxjs';

export interface GameState {
  board: Board;
}

const INITIAL_STATE: GameState = {
  board: createBoard(),
}

const gameState = new BehaviorSubject<GameState>(INITIAL_STATE);

export function startGame() {
  console.log('game started');
}

export function pauseGame() {
  console.log('game paused');
}

export function endGame() {
  console.log('game ended');
}