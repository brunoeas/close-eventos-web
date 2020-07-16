import React from 'react';
import ReactDOM from 'react-dom';
import { LinearProgress, LinearProgressProps } from '@material-ui/core';

export type LoadingPropType = LinearProgressProps & {
  show: boolean;
};

/**
 * Componente para loading
 *
 * @author Gabriela Farias <gabriela.farias@kepha.com.br>
 * @param {LoadingPropType} props
 */
function Loading(props: LoadingPropType): JSX.Element {
  const { show, style, ...others } = props;

  const mergedStyles: React.CSSProperties = {
    zIndex: 1,
    height: 3.5,
    position: 'absolute',
    width: '100%',
    top: 0,
    ...style,
  };

  const component = (
    <LinearProgress {...others} style={!show ? { ...mergedStyles, display: 'none' } : mergedStyles} />
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById('root') || document.createElement('div')
  );
}

export default Loading;
