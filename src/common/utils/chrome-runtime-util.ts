export class ChromeRuntimeUtil {

  public static getExtensionVersion(): string {
    const manifest = chrome.runtime.getManifest();
    return manifest ? manifest.version : '';
  }
}