import { Reducer } from 'redux';
import { IYoutubeButtonActions, IYoutubeButtonState, SET_SHOW_TOOLIP, SET_VIDEO_URL } from './types';

const initialState: IYoutubeButtonState = {
  showTooltip: false
};

export const youtubeButtonReducer: Reducer<IYoutubeButtonState, IYoutubeButtonActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_VIDEO_URL:
      return { ...state, videoUrl: action.videoUrl };
    case SET_SHOW_TOOLIP:
      return { ...state, showTooltip: action.show };

    default:
      return state;
  }
};