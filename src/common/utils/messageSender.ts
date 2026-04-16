import { TMessage } from '../types';
import { TAuthUser } from '../../spa/store/general/types';
import { TUserGroup } from '../../spa/store/models/types';

export enum EMessageType {
  GET_AUTH_USER = 'BACKGROUND/GET_AUTH_USER',
  SET_AUTH_USER = 'BACKGROUND/SET_AUTH_USER',
  GET_USER_GROUPS = 'BACKGROUND/GET_USER_GROUPS',
  SET_USER_GROUPS = 'BACKGROUND/GET_USER_GROUPS',
  ADD_VIDEO = 'BACKGROUND/ADD_VIDEO',
}

export class MessageSender {

  public static async sendGetUserGroups(): Promise<TUserGroup[]> {
    return new Promise((resolve) => {

      const listener = async (message: TMessage, sender: chrome.runtime.MessageSender, sendResponse: Function) => {
        if (message.type === EMessageType.SET_USER_GROUPS) {
          const userGroups: TUserGroup[] = message.payload;
          window.chrome.runtime.onMessage.removeListener(listener);
          resolve(userGroups);
        }
        sendResponse({ status: true });
      }

      MessageSender.sendMessage(EMessageType.GET_USER_GROUPS);
      window.chrome.runtime.onMessage.addListener(listener);
    });
  }

  public static async sendGetAuthUserMessage(): Promise<TAuthUser | undefined> {
    return new Promise((resolve) => {

      const listener = async (message: TMessage, sender: chrome.runtime.MessageSender, sendResponse: Function) => {
        if (message.type === EMessageType.SET_AUTH_USER) {
          const user: TAuthUser = message.payload;
          resolve(user);
        }
        sendResponse({ status: true });
      }

      window.chrome.runtime.onMessage.addListener(listener);
      MessageSender.sendMessage(EMessageType.GET_AUTH_USER);
    });
  }

  public static sendMessage(type: EMessageType, payload?: any) {
    chrome.runtime.sendMessage({
      type: type,
      payload
    });
  };

}
