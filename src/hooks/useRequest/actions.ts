import type { initialStateType } from "./useRequest.types";

enum ACTIONS {
  REQUEST_START = "REQUEST_START",
  REQUEST_END_SUCCESS = "REQUEST_END_SUCCESS",
  REQUEST_FAIL = "REQUEST_FAIL",
  REQUEST_RESET = "REQUEST_RESET"
}

export const startRequest = () => ({
  type: ACTIONS.REQUEST_START
});

export const processRequest = (data: unknown) => ({
  type: ACTIONS.REQUEST_END_SUCCESS,
  payload: data
});

export const handleRequestError = (error: Error) => ({
  type: ACTIONS.REQUEST_FAIL,
  payload: error
});

export const resetRequest = (initialState: initialStateType) => ({
  type: ACTIONS.REQUEST_RESET,
  payload: initialState
});

export default ACTIONS;
