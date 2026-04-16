import BrowserClickedEvent = chrome.action.BrowserClickedEvent;
import Tab = chrome.tabs.Tab;
import { AddVideoUtil } from './addVideoUtil';
import { TabsUtil } from '../../../common/utils/tabs-util';
import { getHomeUrl } from '../../../common/utils/getHomeUrl';
import { TEXT_NO_EMBED_VIDEO_WARINIG } from '../wordings';

export class ChromeActionHandler {

  constructor(onClicked: BrowserClickedEvent) {
    onClicked.addListener(this.onClick.bind(this));
  }

  private async onClick(tab: Tab) {
    if (tab.url && this.isYoutubeUrl(tab.url)) {
      const checkAdd = await AddVideoUtil.checkAddVideo(tab.url)
      if (checkAdd) {
        await AddVideoUtil.open(tab.url);
      } else {
        this.showNoEmbedVideoWarning();
      }
    } else {
      TabsUtil.openOrActivate(getHomeUrl());
    }
    if (tab.id) {
      this.stopYoutubePlayer(tab.id);
    }
  }

  private showNoEmbedVideoWarning() {
    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("logo.png"),
      title: "Lang Magic",
      message: TEXT_NO_EMBED_VIDEO_WARINIG
    });
  }

  private isYoutubeUrl(url: string): boolean {
    if (!url) return false;
    const { hostname, pathname } = new URL(url);
    let host = hostname;
    let ps = host.lastIndexOf('.');
    if (ps >= 0) {
      host = host.substring(0, ps);
    }
    if (host.indexOf('www.') === 0) {
      host = host.substring('www.'.length);
    }
    return pathname.startsWith('/watch') && ['youtube', 'm.youtube', 'youtu'].includes(host);
  }

/*  private async openAddVideo(url: string) {
    const videoId = YoutubeUrlUtil.getVideoId(url);
    if (videoId) {
      AddVideoUtil.open(url);
    }
  }*/

  private stopYoutubePlayer(tabId: number) {
    chrome.scripting.executeScript({
      target: {tabId},
      function: () => {
        const videos = document.getElementsByTagName('video');
        if (videos && videos.length) {
          const video: HTMLVideoElement = videos[0];
          video.pause();
        }
      },
      args: []
    })
  }
}