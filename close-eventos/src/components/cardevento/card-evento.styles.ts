import { makeStyles } from '@material-ui/core';

export const cardEventoWidth = 250;
export const cardEventoHeight = 330;
export const cardEventoContentHeight = 50;

/**
 * Estilos do Card de Evento
 */
const useStyles = makeStyles({
  root: {
    width: cardEventoWidth,
    height: cardEventoHeight,
    marginRight: 15,
    marginBottom: 15,
  },
  media: {
    height: 115,
  },
  textStatus: {
    fontSize: '0.79rem',
    display: 'flex',
    alignItems: 'center',
  },
  cardContent: {
    height: cardEventoContentHeight,
  },
  containerViewEventButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export { useStyles };
