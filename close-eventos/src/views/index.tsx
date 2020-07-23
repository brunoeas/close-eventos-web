import React, { useState } from 'react';
import { useStyles } from './index.styles';
import MainToolbar from '../components/maintoolbar/main-toolbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Eventos from './evento/eventos';
import EditEvento from './evento/edit-evento';
import { useComponentDidMount } from '../utils/hooks';
import UsuarioAPI from '../resources/api/usuario';
import Authentication from '../resources';
import { useHistory } from 'react-router-dom';
import ScreenLoading from '../components/screenloading/screen-loading';

export type AppMainLayoutPropTypes = {};

/**
 * Componente principal e inicial do sistema
 *
 * @param {AppMainLayoutPropTypes} props
 * @returns {JSX.Element}
 */
function AppMainLayout(props: AppMainLayoutPropTypes): JSX.Element {
  const classes = useStyles(props);
  const history = useHistory();

  const [isLoading, setLoading] = useState<boolean>(true);

  useComponentDidMount(() => {
    const usuarioAPI = new UsuarioAPI();

    const token = Authentication.getToken();
    if (!token) {
      history.push('/login');
      Authentication.clear();
      return;
    }

    usuarioAPI
      .login(token)
      .then(() => {
        if (Authentication.getUsuarioLogado()) {
          setLoading(false);
          return;
        }

        usuarioAPI
          .findPerfil()
          .then((res) => {
            setLoading(false);
            Authentication.setUsuarioLogado(res.data);
          })
          .catch((err) => {
            Authentication.clear();
            history.push('/login');
          });
      })
      .catch((err) => {
        Authentication.clear();
        history.push('/login');
      });
  });

  return isLoading ? (
    <ScreenLoading />
  ) : (
    <div className={classes.main}>
      <MainToolbar />

      <div className={classes.content}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Eventos} />
            <Route path='/evento/edit/{id}' component={EditEvento} />
            <Route path='/evento/novo' component={EditEvento} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default AppMainLayout;
