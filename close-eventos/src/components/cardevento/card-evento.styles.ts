import { makeStyles } from '@material-ui/core';

export const cardEventoWidth = 280;
export const cardEventoHeight = 320;
export const cardEventoContentHeight = 50;
export const titleCardEventoWidth = cardEventoWidth - 121;

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
  titleCard: {
    fontWeight: 'bold',
    fontSize: '0.95rem',
    width: titleCardEventoWidth,
  },
  subtitleCard: {
    width: titleCardEventoWidth,
  },
  media: {
    height: 115,
  },
  cardActions: {
    paddingTop: 0,
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
