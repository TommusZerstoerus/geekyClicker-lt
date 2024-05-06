import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#df742f',
        },
        secondary: {
            main: '#111a21',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                    textTransform: 'none',
                },
            },
        },
    }
});