import { UrlUtil } from './url-util';
const base64 = require('base-64');

export class YoutubeUrlUtil {

  private static YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

  public static getUrlById(videoId: string): string {
    return YoutubeUrlUtil.YOUTUBE_URL + videoId
  }

  public static isHttpsUrl(url: string): boolean {
    return url.startsWith('https://');
  }

  public static isYoutubeUrl(url: string): boolean {
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
    return ['youtube', 'm.youtube', 'youtu'].includes(host);
  }

  public static getVideoId(url: string, checkShortUrl: boolean = false): string {
    const query = UrlUtil.getObjectFromUrl(url);
    const result = query.v;
    if (result) return result;
    if (checkShortUrl) {
      let _url = url.trim();
      if (_url.endsWith('/')) {
        _url = _url.substr(0, _url.length - 1);
      }
      let videoId = '';
      let ps = _url.lastIndexOf('/');
      if (ps >= 0) {
        videoId =_url.substr(ps + 1);
      }
      ps = videoId.lastIndexOf('?');
      if (ps >= 0) {
        videoId = videoId.substr(0, ps);
      }
      return videoId;
    }
    return '';
  }

  public static encodeUrl(url: string): string {
    const encoded = base64.encode(url);
    return encoded.replaceAll('/', '|||');
  }

  public static decodeUrl(s: string): string {
    return base64.decode(s.replaceAll('|||', '/'));
  }
}
