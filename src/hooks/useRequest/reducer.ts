import type {
  actionType,
  initialStateType,
  stateType
} from "./useRequest.types";
import ACTIONS from "./actions";

export function init<T>({ initialLoading, initialData }: initialStateType<T>) {
  return {
    loading: initialLoading,
    data: initialData,
    error: null
  };
}

function reducer<T>(state: stateType<T>, action: actionType) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.REQUEST_RESET:
      return init<T>(payload as initialStateType<T>);

    case ACTIONS.REQUEST_START:
      if (state.loading) return state;
      return {
        ...state,
        loading: true
      };

    case ACTIONS.REQUEST_END_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      };

    case ACTIONS.REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
}

export default reducer;
