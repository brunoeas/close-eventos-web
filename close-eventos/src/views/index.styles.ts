import { makeStyles } from '@material-ui/core';
import { mainToolbarMaxHeight } from '../components/maintoolbar/toolbar.styles';

export const contentMarginTop = 15;

/**
 * Estilos do componente principal da aplicação
 */
const useStyles = makeStyles({
  main: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  content: {
    height: `calc(100vh - (${mainToolbarMaxHeight}px + ${contentMarginTop}px))`,
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: contentMarginTop,
  },
});

export { useStyles };
