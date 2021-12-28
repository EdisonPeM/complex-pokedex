import type {
  requestArgs,
  useRequestArgs,
  useRequestReturn
} from "./useRequest.types";
import { useCallback, useReducer } from "react";
import { delayTimeOut } from "../../utils";

import reducer, { init } from "./reducer";
import {
  handleRequestError,
  processRequest,
  resetRequest,
  startRequest
} from "./actions";
import useIsMountedRef from "../useIsMountedRef";

function useRequest<T>({
  initialLoading = false,
  initialData = null,
  baseURL = ""
}: useRequestArgs<T> = {}): useRequestReturn<T> {
  const isMountedRef = useIsMountedRef();
  const [state, dispatch] = useReducer(
    reducer,
    { initialLoading, initialData },
    init
  );

  // const [state, setState] = useState({
  //   loading: initialLoading,
  //   data: initialData,
  //   error: null
  // });

  const request = useCallback(
    async ({
      url,
      endpoint,
      method = "GET",
      headers = {},
      body,
      delay,
      signal,
      dataTransformer = (v) => v,
      throwError = false
    }: requestArgs<DataType> = {}) => {
      if (!url && !baseURL) {
        console.error("Any url are provided");
        return;
      }

      // Safe dispatch
      if (!isMountedRef.current) return;
      dispatch(startRequest());
      // setState((s) => {
      //   if (s.loading) return s;
      //   return {
      //     ...s,
      //     loading: true
      //   };
      // });
      try {
        const res = await fetch(url || `${baseURL}/${endpoint}`, {
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers
          },
          body: body ? JSON.stringify(body) : undefined,
          signal
        });

        const data = await res.json();
        if (delay) await delayTimeOut(delay);
        const dataTransformed = await dataTransformer(data);

        // Safe dispatch
        if (!isMountedRef.current) return;
        dispatch(processRequest(dataTransformed));
        // setState((s) => ({
        //   ...s,
        //   loading: false,
        //   data: dataTransformed
        // }));
        return dataTransformed;
      } catch (error) {
        // Safe dispatch
        if (!isMountedRef.current) return;
        dispatch(handleRequestError(error));
        // setState((s) => ({
        //   ...s,
        //   loading: false,
        //   error
        // }));
        if (throwError) throw error;
        return null;
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const resetState = useCallback(
    () => {
      dispatch(
        resetRequest({
          initialLoading,
          initialData
        })
      );
      // setState({
      //   loading: initialLoading,
      //   data: initialData,
      //   error: null
      // });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { ...state, request, resetState };
}

export default useRequest;
