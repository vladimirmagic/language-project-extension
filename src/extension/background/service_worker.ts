import { TMessage } from '../../common/types';
import { ChromeRuntimeUtil } from '../../common/utils/chrome-runtime-util';
import { YoutubeButtonInjector } from './utils/youtube-button-injector';
import {
  EExtMessageType,
  IExtMessagePayloadAuthUser,
  IExtMessagePayloadVideoId,
  TExtMessage,
  TExtMessagePayload
} from '../../common/utils/ext-message-sender';
import { getYoutubeVideoContent } from './utils/getYoutubeVideoContent';
import { getHomeUrl } from '../../common/utils/getHomeUrl';
import { EMessageType, MessageSender as MsgSender } from '../../common/utils/messageSender';
import { ChromeActionHandler } from './utils/chromeActionHandler';
import { AddVideoUtil } from './utils/addVideoUtil';
import { TAuthUser } from '../../common/models';

type MessageSender = chrome.runtime.MessageSender;

export class BackgroundPage {

  private static UPDATE_VERSIONS_INFO_KEY = 'updateVerionsInfo';
  private static AUTH_USER_KEY = 'authUser';
  private static YOUTUBE_ICON_SHOW_TOOLTIP_KEY = 'youtubeIconShowTooltip';

  private static INSTALL_REASON = 'install';
  private static UPDATE_REASON = 'update';
  private static INSTALL_LOGIN_URL = '/#/install/login'

  private youtubeButtonInjector: YoutubeButtonInjector;

  constructor() {
    chrome.runtime.onMessage.addListener(async(message: TMessage, sender: MessageSender, sendResponse: Function) => {
      await this.onMessage(message, sender, sendResponse);
    });
    chrome.runtime.onInstalled.addListener(this.onInstalled.bind(this));
    chrome.runtime.onMessageExternal.addListener(async(request: any, sender, sendResponse: Function) => {
      this.onExtMessage(request, sender, sendResponse);
    })

    this.youtubeButtonInjector = new YoutubeButtonInjector({
      getAuthUser: async() => {
        return this.getAuthUser();
      },
      getIsShowTooltip: async() => {
        return this.getYoutubeIconShowTooltip();
      },
      onTabActivated: () => {
        this.setYoutubeIconShowTooltip(false);
      }
    });

    new ChromeActionHandler(chrome.action.onClicked)
  }

  private onInstalled(details: chrome.runtime.InstalledDetails) {
    if (BackgroundPage.INSTALL_REASON === details.reason) {
      const url = getHomeUrl() + BackgroundPage.INSTALL_LOGIN_URL;
      chrome.tabs.create({url}, (tab) => {});
     // this.setStorageValue(BackgroundPage.INSTALL_DATE_KEY, new Date().toUTCString());
    //  this.setUserGroups([]);
    } else if (BackgroundPage.UPDATE_REASON === details.reason) {
      const currentVersion = ChromeRuntimeUtil.getExtensionVersion();
      const prevVersion = details.previousVersion;
      if (currentVersion && prevVersion && currentVersion !== prevVersion) {
        this.setStorageValue(BackgroundPage.UPDATE_VERSIONS_INFO_KEY, { prevVersion, currentVersion });
      }
    //  this.setUserGroups([]);
    }
  }

  /*private async setUserGroups(userGroups: TUserGroup[]) {
    await this.setStorageValue(BackgroundPage.USER_GROUPS_KEY, userGroups);
  }

  private async getUserGroups(): Promise<TUserGroup[]> {
    return this.getStorageValue(BackgroundPage.USER_GROUPS_KEY);
  }
*/
  private async setAuthUser(authUser: TAuthUser | null) {
    await this.setStorageValue(BackgroundPage.AUTH_USER_KEY, authUser);
  }

  private async getAuthUser(): Promise<TAuthUser | null> {
    return this.getStorageValue(BackgroundPage.AUTH_USER_KEY);
  }

  private async setYoutubeIconShowTooltip(value: boolean) {
    await this.setStorageValue(BackgroundPage.YOUTUBE_ICON_SHOW_TOOLTIP_KEY, value ? '1' : '0');
  }

  private async getYoutubeIconShowTooltip(): Promise<boolean> {
    const value = await this.getStorageValue(BackgroundPage.YOUTUBE_ICON_SHOW_TOOLTIP_KEY);
    return value === '1' || value === undefined;
  }


  async onExtMessage(request: TExtMessage, sender: MessageSender, sendResponse: Function) {
    let payload: TExtMessagePayload;
    switch (request.type) {
      case EExtMessageType.GET_VIDEO_CAPTIONS:
        payload = request.payload as IExtMessagePayloadVideoId;
        sendResponse(await getYoutubeVideoContent(payload.videoUrl));
        break;

      case EExtMessageType.SET_AUTH_USER:
        payload = request.payload as IExtMessagePayloadAuthUser;
        this.setAuthUser(payload.authUser);
        sendResponse();
        break;

      case EExtMessageType.PING: {
        sendResponse({result: 1});
        break;
      }

    }

  }

  async onMessage(message: TMessage, sender: MessageSender, sendResponse: Function) {
    switch (message.type) {
      case EMessageType.GET_AUTH_USER: {
        const user = await this.getAuthUser();
        MsgSender.sendMessage(EMessageType.SET_AUTH_USER, user);
        sendResponse({status: true});
        break;
      }
      case EMessageType.ADD_VIDEO: {
        const videoUrl = message.payload.videoUrl as string;
        let result: any = {success: true}
        if (videoUrl) {
          const checkAdd = await AddVideoUtil.checkAddVideo(videoUrl)
          if (checkAdd) {
            await AddVideoUtil.open(videoUrl);
          } else {
            result = {
              success: false,
              embeddable: false
            }
          }
        }
        sendResponse(result)
        break;
      }
      /*case EMessageType.GET_USER_GROUPS: {
        MsgSender.sendMessage(EMessageType.SET_USER_GROUPS, await this.getUserGroups());
        sendResponse({status: true});
        break;
      }*/
    }
    return Promise.resolve("");
  }

  private async setStorageValue(key: string, value: any): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.local.set({[key]: value}, resolve);
    })
  }

  private async removeStorageValue(key: string): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.local.remove(key, resolve);
    })
  }

  private async getStorageValue(key: string): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key]);
      });
    })
  }

}

new BackgroundPage();
