import { AppPage } from '../../enums/appPage';

export enum ActionType {
  SET_PAGE = 'SET_PAGE',
  RESET_PAGE = 'RESET_PAGE',
}

export const setPage = (page: AppPage) => ({ type: ActionType.SET_PAGE, payload: page });
type allTypes = typeof setPage;
export type AllActionsTypes = ReturnType<allTypes>;
