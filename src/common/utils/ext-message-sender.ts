import { TMessage } from '../types';
import { TAuthUser } from '../models';
import { EXTENSION_ID } from '../../extension/constants';

export enum EExtMessageType {
  GET_VIDEO_CAPTIONS = 0,
  SET_AUTH_USER = 2,
  PING = 5,
}

export interface IExtMessagePayloadVideoId {
  videoUrl: string
}


export interface IExtMessagePayloadAuthUser {
  authUser: TAuthUser | null
}

export type TExtMessagePayload =
  IExtMessagePayloadVideoId | IExtMessagePayloadAuthUser

export type TExtMessage = {
  type: EExtMessageType;
  payload?: TExtMessagePayload
}

export class ExtMessageSender {

  public static async send(message: TExtMessage | TMessage): Promise<any> {
    return new Promise<any>(resolve => {
      if (chrome.runtime) {
        chrome.runtime.sendMessage(EXTENSION_ID, message, resolve);
      } else {
        resolve(false);
      }
    })
  }
}
