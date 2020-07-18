import Sweetalert, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { theme } from '../../utils/constants';

const SwalAlert = withReactContent(Sweetalert);

/**
 * Abre um modal do SweetAlert2 com mensagem de sucesso ou erro
 *
 * @param {SweetAlertOptions} [props={}] - Props opcionais para customização
 * @returns {Promise<SweetAlertResult>} Promise para caso o modal tenha confirmação
 */
async function Swal(props: SweetAlertOptions = {}): Promise<SweetAlertResult> {
  return SwalAlert.fire({
    allowEscapeKey: false,
    confirmButtonColor: theme.palette.primary.main,
    cancelButtonColor: theme.palette.error.main,
    ...props,
  });
}

export default Swal;
