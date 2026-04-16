import { IYoutubeButtonState } from './store/types';

import ReduxThunk, { ThunkAction } from 'redux-thunk';
import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { youtubeButtonReducer } from './store/reducer';

export interface IState {
  youtubeButton: IYoutubeButtonState;
}

export type TAsyncThunk<R = any> = (dispatch: TAsyncDispatch, getState: TGetState) => void | Promise<R>
export type TAsyncDispatch<R = any> = (action: any) => Promise<R>
export type TGetState = () => IState

export type AppThunk<ReturnType = Promise<any> | any> = ThunkAction<ReturnType, IState, unknown, Action<string>>;

export type TAction<Type> = {
  type: Type;
}

// @ts-ignore
export let appStore;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const REDUX_DEVTOOLS_DEFAULTS = {
  instanceId: 'store',
  trace: true,
  traceLimit: 25
};

const getEnhancers = (
  options: any = {}
) => {
  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      ...REDUX_DEVTOOLS_DEFAULTS,
      ...options
    })
    : compose;
}

export const createApplicationStore = (initialState: Partial<IState>) => {
  const store = createStore<IState, Action, {}, {}>(
    combineReducers({
      youtubeButton: youtubeButtonReducer
    }),
    initialState,
    getEnhancers()(
      applyMiddleware(ReduxThunk)
    )
  );
  appStore = store;
  window.getState = store.getState;
  return store;
};
