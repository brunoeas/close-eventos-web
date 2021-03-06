import React, { ImgHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import Fab, { FabProps } from '@material-ui/core/Fab';
import { useStyles } from './fab.styles';
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export type ButtonFABPropType = FabProps & {
  title?: any;
  iconSrc?: string;
  children?: any;
  ImgIconProps?: ImgHTMLAttributes<HTMLImageElement>;
};

/**
 * Componente para um Botão FAB customizado
 *
 * @param {ButtonFABPropType} props
 * @returns {JSX.Element}
 */
function ButtonFAB(props: ButtonFABPropType): JSX.Element {
  const { children, title = '', iconSrc, ImgIconProps, color = 'primary', ...others } = props;
  const classes = useStyles(props);
  const theme = useTheme();

  const component = (
    <MuiThemeProvider
      theme={createMuiTheme({
        ...theme,
        overrides: {
          ...theme.overrides,
          MuiSvgIcon: {
            ...theme.overrides?.MuiSvgIcon,
            root: { ...theme.overrides?.MuiSvgIcon?.root, fontSize: '1.7rem', color: 'white' },
          },
        },
      })}
    >
      <Tooltip title={title}>
        <Fab color={color} {...others} className={`${classes.fab} ${others.className ?? ''}`}>
          {!iconSrc ? children : <img src={iconSrc} alt=' ' {...ImgIconProps} />}
        </Fab>
      </Tooltip>
    </MuiThemeProvider>
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById('root') || document.createElement('div')
  );
}

export default ButtonFAB;
