import { makeStyles } from '@material-ui/core';
import { mainToolbarMaxHeight } from '../../components/maintoolbar/toolbar.styles';
import { cardHeaderHeight } from '../../components/card/card.styles';

export const cardPaddingBottom = 15;

/**
 * Estilos do fluxo de eventos
 */
const useStyles = makeStyles({
  card: {
    marginBottom: cardPaddingBottom,
    height: `calc(100% - ${cardPaddingBottom}px)`,
  },
  button: {
    height: 35,
    minWidth: 35,
    padding: 5,
  },
  buttonEdit: {
    backgroundColor: 'rgb(66, 173, 232)',
  },
  buttonDelete: {
    marginLeft: 10,
    backgroundColor: 'rgb(243, 58, 48)',
  },
  containerCards: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 30,
  },
  containerScroll: {
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: `calc(100vh - (${mainToolbarMaxHeight}px + ${cardHeaderHeight}px + 30px))`,
  },
});

export { useStyles };
