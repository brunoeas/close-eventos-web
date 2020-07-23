import React from 'react';
import { useStyles } from './toolbar.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import Authentication from '../../resources';

const logo = require('../../assets/images/logo.png');

export type MainToolbarPropTypes = {};

/**
 * Componente do cabeçalho principal
 *
 * @param {MainToolbarPropTypes} props
 * @returns {JSX.Element}
 */
function MainToolbar(props: MainToolbarPropTypes): JSX.Element {
  const classes = useStyles(props);
  const history = useHistory();

  return (
    <div className={classes.container}>
      <AppBar position='static' color='primary' className={classes.appBar} elevation={12}>
        <Toolbar className={classes.toolbar}>
          <Grid container>
            <Grid item xs={4}>
              <Tooltip title='Close eventos'>
                <img src={logo} alt='Logo' onClick={() => history.push('/')} className={classes.logo} />
              </Tooltip>
            </Grid>

            <Grid item xs />

            <Grid item xs={1} className={classes.containerExitButton}>
              <Tooltip title='Sair'>
                <IconButton
                  onClick={() => {
                    Authentication.clear();
                    history.push('/login');
                  }}
                  color='secondary'
                  className={classes.iconButtonExit}
                >
                  <ExitIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainToolbar;
