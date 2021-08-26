import { AppState } from '../reducers';
import { flow } from 'lodash';
import { GameState } from '../../../../lib/src';

export const selectGameState = (state: AppState) => state.game;
export const selectGameLevel = flow(selectGameState, (state: GameState) => state.level);
