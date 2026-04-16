import { ISetShowTooltip, ISetVideoUrl, SET_SHOW_TOOLIP, SET_VIDEO_URL } from './types';

export class YoutubeButtonActions {

  public static setVideoUrl(videoUrl?: string): ISetVideoUrl {
    return {
      type: SET_VIDEO_URL,
      videoUrl
    }
  }

  public static setShowToolip(show: boolean): ISetShowTooltip {
    return {
      type: SET_SHOW_TOOLIP,
      show
    }
  }

}