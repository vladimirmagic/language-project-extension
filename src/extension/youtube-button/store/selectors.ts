import { IState } from '../types';


export class YoutubeButtonSelectors {

  public static getVideoUrl(state: IState): string | undefined {
    return state.youtubeButton.videoUrl;
  }

  public static isShowTooltip(state: IState): boolean {
    return state.youtubeButton.showTooltip;
  }

}