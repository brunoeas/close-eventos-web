import { makeStyles } from '@material-ui/core';

/**
 * Estilos do Botão FAB com menu
 */
const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    right: 30,
    bottom: 30,
    zIndex: 99,
    cursor: 'pointer',
  },
});

export { useStyles };
