import React from 'react';
import { IAppProps } from './types';
import { theme } from '../../../../../common/styles/theme';
import { LogoSmall } from '../../../../../../icons/LogoSmall';
import { ClickAwayListener, IconButton, Popper, Stack } from '@mui/material';
import { Text } from '../../../../../common/components/Text/Text';


const YOUTUBE_BUTTON_ID = 'id-youtube-button';

export const App: React.FC<IAppProps> = ({
    showTooltip,
    onClick
}) => {
    const [isFocused, setFocused] = React.useState<boolean | null>(null);
    const [isHovered, setHovered] = React.useState<boolean | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(showTooltip);
    const [hideTooltip, setHideTooltip] = React.useState(false);
    const [container, setContainer] = React.useState<null | HTMLElement>(null);

    const onFocus = () => {
        setFocused(true);
    };

    const onBlur = () => {
        setFocused(false);
    };

    const onMouseOver = () => {
        setHovered(true);
    };

    const onMouseOut = () => {
        setHovered(false);
    };

    React.useEffect(() => {
        setTimeout(() => {
            const button = document.getElementById(YOUTUBE_BUTTON_ID) as HTMLButtonElement;
            if (button) {
                setAnchorEl(button);
            }
        }, 100);

        const container = document.querySelector('.ytp-right-controls') as HTMLElement;
        if (container) {
            setContainer(container);
        }

        const videoProgress = document.querySelector('.ytp-progress-bar-container') as HTMLElement;

        const onMouseOver = (e: MouseEvent) => {
            setHideTooltip(true);
        };

        const onMouseOut = (e: MouseEvent) => {
            setHideTooltip(false);
        };

        if (!videoProgress) return;
        videoProgress.addEventListener('mouseover', onMouseOver);
        videoProgress.addEventListener('mouseout', onMouseOut);

        return () => {
            videoProgress.removeEventListener('mouseover', onMouseOver);
            videoProgress.removeEventListener('mouseout', onMouseOut);
        }
    }, []);

    const containerStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        px: theme.spacing(1.5),
        height: theme.spacing(4),
        borderRadius: theme.spacing(0.5),
        overflow: 'visible',
        background: theme.palette.common.white,
        '&::before': {
            position: 'absolute',
            left: '50%',
            bottom: 1,
            transform: `translate(-50%, 100%)`,
            content: '""',
            display: 'block',
            width: 0,
            height: 0,
            borderLeft: `5px solid transparent`,
            borderRight: `5px solid transparent`,
            borderTop: `5px solid ${theme.palette.common.white}`,
        }
    };

    return (
        <>
            <IconButton
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onFocus={onFocus}
                onBlur={onBlur}
                id={YOUTUBE_BUTTON_ID}
                sx={{
                    p: theme.spacing(1.25, 1.25),
                    '.MuiSvgIcon-root': { width: theme.spacing(2.5), height: theme.spacing(2.5) }
                }}
                color={'primary'}
            >
                <LogoSmall sx={{ 'rect': { fill: !isFocused && !isHovered ? theme.palette.common.white : null } }} />
            </IconButton>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Popper
                    open={!!anchorEl && open && !hideTooltip}
                    anchorEl={anchorEl}
                    placement={'top'}
                    sx={{ pointerEvents: 'none' }}
                    container={container}
                >
                    <Stack sx={containerStyle}>
                        <Text sx={{ textShadow: 'none' }}>Click to save this video to the LangMagic</Text>
                    </Stack>
                </Popper>
            </ClickAwayListener>
        </>
    );
}
