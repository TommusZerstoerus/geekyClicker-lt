import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#489726',
        },
        secondary: {
            main: '#000000',
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    cursor: 'default',
                    color: '#77fa3c'
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    '&:disabled': {
                        cursor: 'default',
                        backgroundColor: '#404040',
                        color: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                text: {
                    '&:disabled': {
                        color: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                root: {
                    fontSize: '0.9rem',
                    textTransform: 'none',
                },
            },
        },
    },
});