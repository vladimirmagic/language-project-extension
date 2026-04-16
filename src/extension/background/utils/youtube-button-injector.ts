import { TabsUtil } from '../../../common/utils/tabs-util';
import TabActiveInfo = chrome.tabs.TabActiveInfo;
import { YOUTUBE_SHOW_TOOLTIP_KEY } from '../../youtube-button/constants';
import { TAuthUser } from '../../../common/models';

export interface IYoutubeButtonInjectorParams {
  getAuthUser: () => Promise<TAuthUser | null>,
  getIsShowTooltip: () => Promise<boolean>,
  onTabActivated: () => void
}

export class YoutubeButtonInjector {

  private static TAB_INJECT_URL: string = 'https://www.youtube.com/watch?v=';
  private static TAB_INJECT_URL2: string = 'https://www.youtube.com/clip/';

  private static INJECT_FILE_NAME = 'youtube-button-inject.js';

  private activeTabIds: Set<number> = new Set<number>();
  private tabIdWithTooltip: number = 0;

  private getAuthUser: () => Promise<TAuthUser | null>;
  private getIsShowTooltip: () => Promise<boolean>;
  private onTabActivated: () => void;

  constructor(params: IYoutubeButtonInjectorParams) {
    this.getAuthUser = params.getAuthUser;
    this.getIsShowTooltip = params.getIsShowTooltip;
    this.onTabActivated = params.onTabActivated;
    chrome.tabs.onActivated.addListener(this.onActivated.bind(this));
    chrome.tabs.onUpdated.addListener(this.onUpdated.bind(this));
    chrome.tabs.onRemoved.addListener(this.onRemoved.bind(this));
  }

  private async onActivated(info: TabActiveInfo) {
    const youtubeTab = await this.isYoutubeTab(info.tabId);
    if (youtubeTab) {
      this.activeTabIds.add(info.tabId);
      const showTooltip = await this.getIsShowTooltip();
      if (showTooltip && !this.tabIdWithTooltip) {
        this.tabIdWithTooltip = info.tabId;
      }
      this.injectComponent(info.tabId, info.tabId === this.tabIdWithTooltip);
      this.onTabActivated();
    }
  }

  private async onUpdated(tabId: number, changeInfo: object, tab: chrome.tabs.Tab) {
    const youtubeTab = await this.isYoutubeTab(tabId);
    if (youtubeTab) {
      this.activeTabIds.add(tabId);
      const showTooltip = await this.getIsShowTooltip();
      if (showTooltip && !this.tabIdWithTooltip) {
        this.tabIdWithTooltip = tabId;
      }
      this.injectComponent(tabId, tabId === this.tabIdWithTooltip);
      this.onTabActivated();
    } else {
      this.activeTabIds.delete(tabId);
    }
  }

  private async onRemoved(tabId: number) {
    const youtubeTab = await this.isYoutubeTab(tabId);
    if (youtubeTab) {
      this.activeTabIds.delete(tabId);
    }
  }

  private async injectComponent(tabId: number, showTooltip: boolean) {
    chrome.scripting.executeScript({
        target: {tabId},
        files: [YoutubeButtonInjector.INJECT_FILE_NAME]
    })
    chrome.scripting.executeScript({
      target: {tabId},
      function: (key, show) => {
        const value = sessionStorage.getItem(key);
        if (value === undefined || value === null) {
          sessionStorage.setItem(key, show ? '1' : '0');
        }

      },
      args: [YOUTUBE_SHOW_TOOLTIP_KEY, showTooltip]
    })
  }

  private async isYoutubeTab(tabId: number): Promise<boolean> {
    const tab = await TabsUtil.findByTabId(tabId);
    const youtubeUrls = [YoutubeButtonInjector.TAB_INJECT_URL, YoutubeButtonInjector.TAB_INJECT_URL2];
    return !!(tab && tab.url &&
      youtubeUrls.some(url => tab.url.indexOf(url) === 0));
  }

}
