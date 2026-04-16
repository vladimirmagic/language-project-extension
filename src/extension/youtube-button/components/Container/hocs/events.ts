import { YoutubeButtonActions } from '../../../store/actions';
import { AppThunk } from '../../../types';

export class ContainerEvents {

  public static onVideoChange(videoUrl?: string): AppThunk {
    return async (
      dispatch,
      getState
    ): Promise<any> => {
      dispatch(YoutubeButtonActions.setVideoUrl(videoUrl));
    }
  }

  public static onShowTooltipChange(boolean: boolean): AppThunk {
    return async (
      dispatch,
      getState
    ): Promise<any> => {

    }
  }



}