export enum ACTIONS {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type SetModalOpenAction = Action<
  ACTIONS.OPEN_MODAL,
  { content: JSX.Element }
>;
export type SetModalCloseAction = Action<ACTIONS.CLOSE_MODAL, null>;

export const openModal = (content: JSX.Element): SetModalOpenAction => ({
  type: ACTIONS.OPEN_MODAL,
  payload: { content },
});
export const closeModal: SetModalCloseAction = {
  type: ACTIONS.CLOSE_MODAL,
  payload: null,
};
