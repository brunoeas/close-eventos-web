import { makeStyles } from '@material-ui/core';

/**
 * Estilos dos fluxos relacionados ao usuário
 */
const useStyles = makeStyles((theme) => ({
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  buttonCancelar: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    marginRight: 15,
  },
  inputFile: {
    display: 'none',
    width: 0,
    height: 0,
  },
  buttonRemoveImg: {
    color: 'white',
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
    marginRight: 15,
  },
}));

export { useStyles };
