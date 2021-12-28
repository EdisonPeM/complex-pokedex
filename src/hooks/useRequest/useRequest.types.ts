export type actionType = {
  type: string;
  payload?: unknown;
};

export type initialStateType<T> = {
  initialLoading?: boolean;
  initialData?: T | null;
};

export type stateType<T> = {
  loading: boolean;
  data: null | T;
  error: null | Error;
};

export type useRequestArgs<T> = initialStateType<T> & { baseURL?: string };

export type requestArgs<T> = {
  url?: string;
  endpoint?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  delay?: number;
  signal?: AbortSignal;
  dataTransformer?: (data: unknown) => T;
  throwError?: boolean;
};

export type useRequestReturn<T> = stateType<T> & {
  request: (args: requestArgs<T>) => Promise<T | null>;
  resetState: () => void;
};
