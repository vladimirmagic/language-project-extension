export const getYoutubeVideoContent = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const startSubstr = '"captionTracks":[';
    const startPos = text.indexOf(startSubstr);
    return text;
  } catch (e) {
    console.error(e)
    return null;
  }

}