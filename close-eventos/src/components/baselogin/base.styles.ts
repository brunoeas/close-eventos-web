import { makeStyles } from '@material-ui/core';

const backgroundImage = require('../../assets/images/background-image.jpg');

export const cardPadding = 30;
export const logoMinHeight = 80;

/**
 * Estilos do cabeçalho principal
 */
const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    overflow: 'visible',
  },
  containerLogo: {
    marginTop: `-${cardPadding + logoMinHeight / 3}px`,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: 'calc((100vw / 12) * 3)',
    objectFit: 'cover',
  },
});

export { useStyles };
