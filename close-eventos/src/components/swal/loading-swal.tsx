import React from 'react';
import Sweetalert, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import './swal-styles.css';
import { theme } from '../../utils/constants';

const Swal = withReactContent(Sweetalert);

export type LoadingSwalParams = SweetAlertOptions & {
  circularProgressProps?: CircularProgressProps;
};

/**
 * Abre um modal do SweetAlert2 com configurações para um loading
 *
 * @param {LoadingSwalParams} [props={}] - Props opcionais para customização
 * @returns {Promise<SweetAlertResult>} - Promise para caso o modal tenha confirmação, por padrão não é necessário
 */
async function LoadingSwal(props: LoadingSwalParams = {}): Promise<SweetAlertResult> {
  const { circularProgressProps = {}, ...others } = props;

  return Swal.fire({
    title: (
      <MuiThemeProvider theme={theme}>
        <CircularProgress size={50} {...circularProgressProps} />
      </MuiThemeProvider>
    ),
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: false,
    showConfirmButton: false,
    ...others,
    customClass: {
      title: 'container-swal',
      ...others.customClass,
    },
  });
}

export default LoadingSwal;
