import { EMessageType } from './utils/messageSender';
import { IState } from '../extension/youtube-button/types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type TMessage = {
  type: EMessageType;
  payload?: any
}

export type TAction<Type> = {
  type: Type;
}

export type TAsyncThunk<R = any> = (dispatch: TAsyncDispatch, getState: TGetState) => void | Promise<R>
export type TAsyncDispatch<R = any> = (action: any) => Promise<R>
export type TGetState = () => IState

export type AppThunk<ReturnType = Promise<any> | any> = ThunkAction<ReturnType, IState, unknown, Action<string>>;
