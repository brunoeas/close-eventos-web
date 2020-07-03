import { makeStyles } from '@material-ui/core';

/**
 * Estilos do Login
 */
const useStyles = makeStyles({
  containerButtonLogin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  buttonLogin: {
    width: 125,
    fontWeight: 'lighter',
  },
});

export { useStyles };
