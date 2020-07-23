import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './views/main-routes';
import { MuiThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';
import { theme } from './utils/constants';
import Authentication from './resources';

moment.locale('pt-BR');

Authentication.initInterceptors();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
);
