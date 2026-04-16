import { getHomeUrl } from '../../../common/utils/getHomeUrl';
import { TabsUtil } from '../../../common/utils/tabs-util';
import { YoutubeUrlUtil } from '../../../common/utils/youtube-url-util';
import axios, { AxiosResponse } from 'axios';

export class AddVideoUtil {

  private static CHECK_ADD_VIDEO_URL = 'https://app.langmagic.com/api/videoMetaPublic/embeddable'

  public static async open(url: string) {
    const param = YoutubeUrlUtil.encodeUrl(url);
    const videoUrl = `${getHomeUrl()}/addvideourl/${param}`;
    await TabsUtil.openUrl(videoUrl);
    await TabsUtil.activateAppTab();
  }

  public static async checkAddVideo(videoUrl: string): Promise<boolean> {
    const videoId = YoutubeUrlUtil.getVideoId(videoUrl)
    try {
      const result = await postRequestWithoutToken(this.CHECK_ADD_VIDEO_URL, {videoId});
      return result?.result;
    } catch (e) {
      console.log('error', e)
    }
    return false;
  }
}

const postRequestWithoutToken = async (
  url: string,
  body: any,
  params: any = {}
): Promise<any> => {
  const requestConfig = {
    ...params
  };
  return axios.post(url, body, requestConfig)
    .then((response: AxiosResponse) => response.data);
}