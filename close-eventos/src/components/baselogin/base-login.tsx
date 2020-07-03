import React from 'react';
import { useStyles } from './base.styles';
import Card from '../../components/card/card';
import Grid from '@material-ui/core/Grid';

const logo = require('../../assets/images/logo.png');

export type BaseLoginPropTypes = {
  children: any;
  size?: boolean | 'auto' | 3 | 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  head?: string | JSX.Element;
};

/**
 * Base para implementação das telas de login, cadastro e equivalentes
 *
 * @param {BaseLoginPropTypes} props
 * @returns {JSX.Element}
 */
function BaseLogin(props: BaseLoginPropTypes): JSX.Element {
  const { children, size = 4, head } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs />

        <Grid item xs={size}>
          <Card className={classes.card} head={head}>
            {!head && (
              <div className={classes.containerLogo}>
                <img src={logo} alt='Logo' className={classes.logo} />
              </div>
            )}

            <div style={!head ? { marginTop: 30 } : undefined}>{children}</div>
          </Card>
        </Grid>

        <Grid item xs />
      </Grid>
    </div>
  );
}

export default BaseLogin;
