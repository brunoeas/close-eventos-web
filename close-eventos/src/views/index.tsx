import React from 'react';
import { useStyles } from './index.styles';
import MainToolbar from '../components/maintoolbar/main-toolbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Eventos from './evento/eventos';

export type AppMainLayoutPropTypes = {};

/**
 * Componente principal e inicial do sistema
 *
 * @param {AppMainLayoutPropTypes} props
 * @returns {JSX.Element}
 */
function AppMainLayout(props: AppMainLayoutPropTypes): JSX.Element {
  const classes = useStyles(props);

  return (
    <div className={classes.main}>
      <MainToolbar />

      <div className={classes.content}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Eventos} />
            <Route path='*' render={() => <Redirect to='/' />} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default AppMainLayout;
