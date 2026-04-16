import { tabs } from '../../src/spa/typings/chrome';
import { getHomeUrl } from './getHomeUrl';

export class TabsUtil {

  public static async getCurrentTab(): Promise<tabs.Tab> {
    return new Promise((resolve) => {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs: tabs.Tab[]) => {
          resolve(tabs[0]);
        }
      );
    });
  }

  public static getActiveTabSync(callback: any) {
    chrome.tabs.query({ active: true, currentWindow: true },
      (tabs: tabs.Tab[]) => {
        callback(tabs[0]);
      }
    );
  }

  public static async openUrl(url: string) {
    let tab: tabs.Tab = await TabsUtil.findAppTab();
    if (!tab) {
      tab = await TabsUtil.getCurrentTab();
    }
    if (tab) {
      chrome.tabs.update(tab.id, { selected: false, url: url });
    }
  }

  public static async activateAppTab() {
    const tab: tabs.Tab = await TabsUtil.findAppTab();
    if (tab) {
      chrome.tabs.update(tab.id, { selected: true });
    }
  }

  public static async findAppTab() {
    return new Promise<tabs.Tab>((resolve) => {
      const baseUrl = getHomeUrl();
      chrome.tabs.query({ }, (tabs: tabs.Tab[]) => {
          const tab = tabs.find((tab) => {
            return tab.url && tab.url.includes(baseUrl);
          })
          resolve(tab);
        }
      );
    });
  }

  public static async findByTabId(tabId: number) {
    return new Promise<chrome.tabs.Tab>((resolve) => {
      chrome.tabs.query({}, (tabs: tabs.Tab[]) => {
          const tab = tabs.find((tab) => {
            return tab.id === tabId;
          })
          resolve(tab);
        }
      );
    });
  }

  public static async create(url: string) {
    return new Promise<chrome.tabs.Tab>((resolve) => {
      chrome.tabs.create({
        active: true,
        url
      }, tab => {
        resolve();
      }
      );
    });
  }

  public static async openOrActivate(url: string) {
    let tab: tabs.Tab = await TabsUtil.findAppTab();
    if (!tab) {
      await TabsUtil.create(url);
    } else {
      chrome.tabs.update(tab.id, { selected: true, url });
    }
  }
}