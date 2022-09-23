import type { ModalState, AppState } from "~/store";
import type {
  Action,
  SetModalCloseAction,
  SetModalOpenAction,
} from "~/store/actions";
import { ACTIONS } from "~/store/actions";

export function modalReducer(
  modalState: ModalState,
  action: SetModalOpenAction | SetModalCloseAction
) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.OPEN_MODAL:
      modalState.open = true;
      modalState.content = payload.content;
      break;
    case ACTIONS.CLOSE_MODAL:
      modalState.open = false;
      break;
    default:
      break;
  }
  return modalState;
}

export function rootReducer(state: AppState, action: Action<any, any>) {
  return {
    modal: modalReducer(state.modal, action),
  };
}
