import { makeStyles } from '@material-ui/core/styles';

export const dialogEventoHeaderHeight = '25vh';

/**
 * Estilos da modal
 */
const useStyles = makeStyles((theme) => ({
  descricao: {
    maxWidth: '75vw',
  },
  dialog: {
    maxWidth: '95vw',
    maxHeight: '95vh',
    width: 'auto',
  },
  dialogHeader: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: dialogEventoHeaderHeight,
    padding: 0,
  },
  dialogTitleContainer: {
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0.77), rgba(0,0,0,0.77))`,
    display: 'flex',
    alignItems: 'flex-end',
  },
  dialogTitle: {
    padding: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  dialogContent: {
    padding: 30,
    fontSize: '0.9rem',
    overflowY: 'auto',
    minWidth: '60vw',
  },
}));

export { useStyles };
