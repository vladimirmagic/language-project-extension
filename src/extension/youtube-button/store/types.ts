import { TAction } from '../types';


export const SET_VIDEO_URL = 'YOUTUBE_BUTTON/SET_VIDEO_URL';
export const SET_SHOW_TOOLIP = 'YOUTUBE_BUTTON/SET_SHOW_TOOLIP';

export interface IYoutubeButtonState {
  videoUrl?: string;
  showTooltip: boolean
}

export interface ISetVideoUrl extends TAction<typeof SET_VIDEO_URL> {
  videoUrl?: string;
}

export interface ISetShowTooltip extends TAction<typeof SET_SHOW_TOOLIP> {
  show: boolean
}

export type IYoutubeButtonActions =
  ISetVideoUrl |
  ISetShowTooltip;