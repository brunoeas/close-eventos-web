import { makeStyles } from '@material-ui/core';

/**
 * Estilos do ScreenLoading
 */
const useStyles = makeStyles({
  container: {
    position: 'absolute',
    zIndex: 999999999999,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: '30vw',
    height: '30vh',
    objectFit: 'contain',
  },
  animatedLine: {
    width: '100%',
    top: 0,
    height: 3.5,
    position: 'absolute',
  },
});

export { useStyles };
