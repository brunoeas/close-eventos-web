import { makeStyles } from '@material-ui/core';

export const cardHeaderHeight = 60;
export const cardHeaderBackgroundColor = 'rgb(139, 200, 165, 0.1)';

/**
 * Estilos do Card
 */
const useStyles = makeStyles((theme) => ({
  divTitulo: {
    display: 'flex',
    alignItems: 'center',
    height: cardHeaderHeight,
    fontSize: '1.43rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    backgroundColor: cardHeaderBackgroundColor,
    paddingLeft: 30,
    paddingRight: 30,
  },
  card: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: 30,
  },
}));

export { useStyles };
