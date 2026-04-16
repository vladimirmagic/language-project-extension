import React from 'react';
import { AppHOC } from '../../App/hocs/AppHOC';
import { IContainerProps } from './types';
import { YOUTUBE_SHOW_TOOLTIP_KEY } from '../../../constants';
import { ThemeProvider } from "@mui/material";
import { YoutubeUrlUtil } from '../../../../../common/utils/youtube-url-util';
import { theme } from '../../../../../common/styles/theme';

export const Container: React.FC<IContainerProps> = ({
  onVideoChange
}) => {
  const [url, setUrl] = React.useState<string | null>();
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  React.useEffect(() => {
    setInterval(() => {
      if (location.href) {
        setUrl(location.href);
      }
      const showTooltipValue = sessionStorage.getItem(YOUTUBE_SHOW_TOOLTIP_KEY);
      setShowTooltip(showTooltipValue ? showTooltipValue === '1' : false);
    }, 1000);
  }, []);


  React.useEffect(() => {
    if (url)
      onVideoChange(url);
  }, [url]);

  React.useEffect(() => {
 //   onShowTooltipChange(showTooltip);
  }, [showTooltip]);

  if (!YoutubeUrlUtil.isYoutubeUrl(url)) return null;

  return (
      <ThemeProvider theme={theme}>
        <AppHOC />
      </ThemeProvider>
  );

}
