import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppMainLayout from './';
import Login from './login/login';
import CadastroUsuario from './usuario/cadastro-usuario';

/**
 * Cria e declara as rotas principais do App
 */
function createRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/cadastro-usuario' component={CadastroUsuario} />
        <Route path='/' component={AppMainLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default createRoutes;
