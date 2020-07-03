import { makeStyles } from '@material-ui/core';

export const mainToolbarMaxHeight = 80;
export const mainToolbarContentHeight = 50;

/**
 * Estilos do cabeçalho principal
 */
const useStyles = makeStyles({
  container: {
    maxHeight: mainToolbarMaxHeight,
    width: '100%',
    flexGrow: 1,
  },
  appBar: {
    height: mainToolbarMaxHeight,
  },
  logo: {
    objectFit: 'cover',
    height: mainToolbarContentHeight,
    cursor: 'pointer',
  },
  toolbar: {
    height: mainToolbarMaxHeight,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    boxSizing: 'border-box',
  },
  containerExitButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButtonExit: {
    height: mainToolbarContentHeight,
    width: mainToolbarContentHeight,
  },
  containerRoutesButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { useStyles };
