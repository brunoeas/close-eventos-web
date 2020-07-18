import { makeStyles } from '@material-ui/core';
import { mainToolbarMaxHeight } from '../../components/maintoolbar/toolbar.styles';
import { cardHeaderHeight } from '../../components/card/card.styles';

export const cardPaddingBottom = 15;
export const editImgHeight = 250;

/**
 * Estilos do fluxo de eventos
 */
const useStyles = makeStyles((theme) => ({
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
  inputFile: {
    display: 'none',
    width: 0,
    height: 0,
  },
  containerInputImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRemoveImg: {
    right: 15,
    top: 15,
    position: 'absolute',
    zIndex: 9,
    color: theme.palette.error.main,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  divImg: {
    height: editImgHeight,
    width: '100%',
    borderRadius: 15,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
  },
  divAddImg: {
    height: editImgHeight,
    width: '100%',
    borderRadius: 15,
    cursor: 'pointer',
    border: '1px solid #262e39',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '5rem',
    backgroundColor: '#EEE',
  },
}));

export { useStyles };
