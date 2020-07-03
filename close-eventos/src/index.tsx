import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import AppMainLayout from './views/app/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#474747',
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
    <div />
  </MuiThemeProvider>,
  document.getElementById('root')
);
