import { createTheme } from "@mui/material";
import './expanded-theme.ts';

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    padding: 0,
                    margin: 0,
                    color: '#1F242D', // grey[900]
                    backgroundColor: '#F1F3F9', // grey[100]
                }
            }
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true
            },
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '12px',
                    textTransform: 'none',
                }
            }
        },
        MuiFilledInput: {
            defaultProps: {
                disableUnderline: true
            },
            styleOverrides: {
                input: {
                    padding: 0,
                },
                root: {
                    height: 40,
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    borderRadius: 6,
                    background: '#F1F3F9', // grey[100]
                    color: '#1F242D', // grey[900]
                    textTransform: 'unset',
                    border: '2px solid transparent',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background: '#E3E7ED' // grey[200]
                    },
                    '&.Mui-focused': {
                        background: '#F1F3F9', // grey[100]
                        '.MuiTextField-root &': {
                            borderColor: '#29BA98', // primary[400]
                        }
                    },
                    '.MuiTextField-root &': {
                        padding: '0 12px '
                    },
                    '&.MuiInputBase-multiline': {
                        padding: '12px'
                    }
                },
                multiline: {
                    height: 'fit-content',
                },
                inputMultiline: {
                    padding: '6px 8px'
                }
            },
        },
        MuiMenuItem: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true
            },
            styleOverrides: {
                root: {
                    height: 36,
                    fontWeight: 600,
                    fontSize: '12px'
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                disableUnderline: true,
            },
            styleOverrides: {
                select: {
                    fontWeight: 600,
                },
                filled: {
                    padding: '12px 16px 10px 12px',
                    paddingRight: '16px !important',
                    borderRadius: 6,
                    background: 'none'
                },
                iconFilled: {
                    width: '24px',
                    height: '24px',
                    color: '#29BA98', // primary[400]
                    // transform: 'scale(1.3)',
                    right: 4
                },
            }
        },
        MuiAlert: {
            styleOverrides: {
                filledWarning: {
                    background: '#FDF0CE' // warning[300]
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 8,
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 5px -3px, rgba(0, 0, 0, 0.05) 0px 8px 10px 1px, rgba(0, 0, 0, 0.05) 0px 2px 8px 2px',

                    '.MuiMenuItem-root': {
                        fontSize: '14px',
                        fontWeight: 400,
                    },
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 32,
                    padding: '0 10px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    fontSize: '14px',
                    backdropFilter: 'blur(8px)',
                    '.MuiTooltip-arrow': {
                        color: 'rgba(0, 0, 0, 0.5)',
                    }
                },
            }
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
                disableFocusRipple: true,
                disableTouchRipple: true,
            },
            styleOverrides: {
                colorPrimary: {
                    color: '#29BA98', // primary[500]
                    '&:focus-visible': {
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            right: 0,
                            border: '#29BA98 2px solid', // primary[500]
                            borderRadius: '6px',
                            opacity: 0.5
                        }
                    },
                    '&:disabled': {
                        opacity: 0.5,
                    },
                    '.MuiSvgIcon-root': {
                        width: 20,
                        height: 20,
                        color: 'inherit'
                    }
                },
                colorSecondary: {
                    height: 40,
                    width: 40,
                    color: '#29BA98', // primary[500]
                    background: '#F1F3F9', // grey[100]
                    borderRadius: 6,
                    '&:hover': {
                        background: '#E3E7ED' // grey[200]
                    },
                    '&:active': {
                        color: '#ffffff',
                        background: '#29BA98', // primary[500]
                    },
                    '&:focus-visible': {
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: -6,
                            top: -6,
                            bottom: -6,
                            right: -6,
                            border: '#29BA98 2px solid', // primary[500]
                            borderRadius: 10,
                            opacity: 0.5
                        }
                    },
                    '&:disabled': {
                        opacity: 0.5,
                    },
                    '.MuiSvgIcon-root': {
                        width: 20,
                        height: 20,
                        color: 'inherit'
                    }
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableFocusRipple: true,
                disableTouchRipple: true,
            },
            styleOverrides: {
                contained: {
                    position: 'relative',
                    height: 40,
                    minWidth: 'unset',
                    borderRadius: 6,
                    border: '2px solid transparent',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '14px',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover, &:active, &:focus': {
                        boxShadow: 'none',
                    },
                    '&:focus-visible': {
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: -6,
                            top: -6,
                            bottom: -6,
                            right: -6,
                            border: '#29BA98 2px solid', // primary[500]
                            borderRadius: 10,
                            opacity: 0.5
                        }
                    },
                    '&:disabled': {
                        opacity: 0.5,
                    }
                },
                containedPrimary: {
                    background: '#29BA98', // primary[400]
                    color: '#ffffff',
                    '&:hover': {
                        background: '#25A789' // primary[500]
                    },
                },
                containedSecondary: {
                    background: '#697387', // grey[500]
                    color: '#ffffff',
                    '&:hover': {
                        background: '#485060' // grey[600]
                    },
                },
                containedInfo: { // tertiary
                    background: '#F1F3F9', // grey[100]
                    color: '#485060', // grey[600]
                    '&:hover': {
                        background: '#E3E7ED' // grey[200]
                    },
                    '&:active': {
                        color: '#ffffff',
                        background: '#29BA98', // primary[500]
                    },
                },
                outlined: { // toggle
                    position: 'relative',
                    height: 40,
                    minWidth: 'unset',
                    borderRadius: 6,
                    padding: '12px 16px',
                    border: '2px solid #E3E7ED', // grey[200]
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '14px',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: '#485060', // grey[600]
                    '&:hover, &:active, &:focus': {
                        boxShadow: 'none',
                    },
                    '&:hover': {
                        border: '2px solid #D3D7E1', // grey[300]
                        background: 'none'
                    },
                    '&:active': {
                        color: '#ffffff',
                        background: '#29BA98', // primary[500]
                        borderColor: 'transparent'
                    },
                    '&:focus-visible': {
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: -6,
                            top: -6,
                            bottom: -6,
                            right: -6,
                            border: '#29BA98 2px solid', // primary[500]
                            borderRadius: 10,
                            opacity: 0.5
                        }
                    },
                    '&:disabled': {
                        color: '#E3E7ED', // grey[200]
                        background: '#F8F9FC', // grey[50]
                    },
                    '.MuiButton-startIcon': {
                        color: '#9CA5B6', // grey[400]
                    }
                },
                outlinedSecondary: { // tab
                    height: 28,
                    padding: '8px 10px',
                    '&:hover': {
                        background: '#F8F9FC', // grey[50]
                        borderColor: '#E3E7ED' // grey[200]
                    },
                    '&:active': {
                        background: '#29BA98', // primary[500]
                        borderColor: 'transparent'
                    },
                    '&:disabled': {
                        background: 'none'
                    }
                },
                textPrimary: {
                    minWidth: 'unset',
                    padding: 0,
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '14px',
                    textTransform: 'none',
                    '&:hover, &:focus, &:active': {
                        background: 'none',
                    },
                    '&:focus-visible': {
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: -8,
                            top: -8,
                            bottom: -8,
                            right: -8,
                            border: '#29BA98 2px solid', // primary[500]
                            borderRadius: 6,
                            opacity: 0.5
                        }
                    },
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    overflow: 'visible',

                    '&:not(.Mui-checked) .MuiSwitch-track': {
                        backgroundColor: '#E3E7ED', // grey[200]
                    },

                    '.MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
                        color: '#fff',

                        '.MuiSwitch-thumb': {
                            boxShadow: 'none',
                        },

                        '& + .MuiSwitch-track': {
                            opacity: .3,
                        }
                    },
                },
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    '.MuiFormControlLabel-label.Mui-disabled': {
                        color: 'inherit',
                    },
                },
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    height: 'auto',
                    padding: '0 12px',
                    color: '#1F242D', // grey[900]
                    fontWeight: 600,
                    textTransform: 'none',
                    border: '2px solid #E3E7ED', // grey[200]
                    borderRadius: '6px',

                    '&:hover': {
                        background: '#f8f9fc', // grey[50]
                    },

                    '&.Mui-selected': {
                        color: '#fff',
                        background: '#29BA98', // primary
                        borderColor: '#29BA98',
                    },

                    '&.Mui-selected:hover': {
                        background: '#25A789', // primary[500]
                        borderColor: '#25A789',
                    },
                },
            }
        },

        MuiFormControl: {
            styleOverrides: {
                root: {
                    margin: 0,

                    '.MuiFormLabel-root': {
                        position: 'static',
                        marginBottom: '8px',
                        color: '#697387', // grey[500]
                        fontSize: '12px',
                        transform: 'none',
                    },
                },
            }
        },

        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    '.MuiTypography-root': {
                        color: '#1F242D4D', // grey[900] 30%
                        fontWeight: 600,
                    },
                },
            }
        },

        MuiInputBase: {
            styleOverrides: {
                root: {
                    '.MuiInputBase-input': {
                        fontSize: '14px',
                    },
                    '.MuiSelect-select': {
                        fontWeight: 400,
                    },
                },
            }
        },
    },
    palette: {
        primary: {
            main: '#29BA98',
            light: '#ECF8F5',
            50: '#ECF8F5',
            100: '#E1F4EF',
            200: '#a9e3d6',
            300: '',
            400: '#29BA98',
            500: '#25A789',
            600: '',
            700: '',
            800: '',
            900: '',
        },
        secondary: {
            main: '#F1F3F9',
            100: '#74AA9C', // chatGPT
            200: '#FF9F1F', // label orange
            300: '#1787FF', // label blue
            400: '#ff69eb', // label pink
        },
        error: {
            main: '#f46767'
        },
        success: {
            main: '#4CAF50'
        },
        warning: {
            light: '#FDF0CE',
            main: '#FCF5D6',
            dark: '#786102',
            50: '#FEF6E2',
            100: '#FDF0CE',
            200: '',
            300: '',
            400: '',
            500: '',
            600: '',
            700: '',
            800: '',
            900: '#624804',
        },
        primaryPurple: {
            50: '',
            100: '',
            200: '',
            300: '',
            400: '#6842F8',
            500: '',
            600: '',
            700: '',
            800: '',
            900: '',
        },
        grey: {
            50: '#F8F9FC',
            100: '#F1F3F9',
            200: '#E3E7ED',
            300: '#D3D7E1',
            400: '#9CA5B6',
            500: '#697387',
            600: '#485060',
            700: '#3A4150',
            800: '#2A303D',
            900: '#1F242D'
        },
        info: {
            100: '#fff2cf', // highlight word light
            200: '#ffdf87', // highlight word
            500: '#cee2fd', // context
            600: '#5380bc', // textBlue
        },
        hint: {
            light: '#f0f6ff',
            main: '#c7ddff',
        },
        orange: {},
    },
    typography: {
        fontSize: 12,
        subtitle1: { fontSize: 12 },
        subtitle2: { fontSize: 14 },
        body1: { fontSize: 12 },
        body2: { fontSize: 8 },
        h6: { fontSize: 16 },
        h5: { fontSize: 18 },
        h4: { fontSize: 20 },
        h3: { fontSize: 24 },
        h2: { fontSize: 32 },
        h1: { fontSize: 48 },
        fontFamily: '"Twemoji Country Flags", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    },
    breakpoints: {
        values: {
            xs: 380,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    shadows: [
        'none',
        '',
        '0px 4px 4px 0px rgba(38, 45, 56, 0.04)', // 2 = small
        '',
        '',
        '',
        '',
        '',
        '0px 2px 8px 0px rgba(38, 45, 56, 0.08)', // 8 = medium
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '0px 2px 16px 0px rgba(38, 45, 56, 0.16)', // 16 = large
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ],
});
