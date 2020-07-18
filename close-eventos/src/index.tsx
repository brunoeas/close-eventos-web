import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './views/main-routes';
import { MuiThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';
import { theme } from './utils/constants';

moment.locale('pt-BR');

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
);
