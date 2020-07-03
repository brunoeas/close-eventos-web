import { makeStyles } from '@material-ui/core';

export const cardPaddingBottom = 15;

/**
 * Estilos do fluxo de eventos
 */
const useStyles = makeStyles({
  card: {
    marginBottom: cardPaddingBottom,
    height: `calc(100% - ${cardPaddingBottom}px)`,
  },
});

export { useStyles };
