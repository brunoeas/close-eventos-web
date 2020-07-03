import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './views/main-routes';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';

moment.locale('pt-BR');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#262e39',
    },
    secondary: {
      main: '#FFF',
    },
    error: {
      main: '#f33a30',
    },
    background: {
      default: 'linear-gradient(#46A770, #00863B)',
    },
    text: {
      primary: 'rgb( 0, 0, 0, 0.7)',
      secondary: 'rgb(0, 0, 0, 0.6)',
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottomColor: '#474747',
        },
      },
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
);
