import React from 'react';
import { useStyles } from './screen-loading.styles';
import { LinearProgress } from '@material-ui/core';

const logo = require('../../assets/images/logo.png');

export type ScreenLoadingPropTypes = {};

function ScreenLoading(props: ScreenLoadingPropTypes): JSX.Element {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <LinearProgress className={classes.animatedLine} />

      <img className={classes.logo} src={logo} alt='Logo' />
    </div>
  );
}

export default ScreenLoading;
