import { YoutubeButtonSelectors } from '../../../store/selectors';
import { AppThunk } from '../../../types';
import { ExtMessageSender } from '../../../../../common/utils/ext-message-sender';
import { EMessageType } from '../../../../../common/utils/messageSender';
import { TEXT_NO_EMBED_VIDEO_WARINIG } from '../../../../background/wordings';

export class AppEvents {

  public static onClick() : AppThunk {
    return async (
      dispatch,
      getState
    ) => {
      const videoUrl = YoutubeButtonSelectors.getVideoUrl(getState());
      if (videoUrl) {

        const resp = await ExtMessageSender.send({
          type: EMessageType.ADD_VIDEO, payload: { videoUrl }
        })
        if (resp?.success === false && resp?.embeddable === false) {
          return alert(TEXT_NO_EMBED_VIDEO_WARINIG);
        }

        const videos = document.getElementsByTagName('video');
        if (videos && videos.length) {
          const video: HTMLVideoElement = videos[0];
          video.pause();
        }
      }
    }
  }

}
