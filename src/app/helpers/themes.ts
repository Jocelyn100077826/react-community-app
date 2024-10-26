import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b93f8',
      light: '#949494',
      contrastText:"#f3f3f3"
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
    background: {
      default: '#f2f2f2',
      paper: '#ffffff',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b93f8',
      light: '#545454',
      contrastText:"#2b2b2b"
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
});