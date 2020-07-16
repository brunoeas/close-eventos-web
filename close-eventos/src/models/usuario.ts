import TipoSexoEnum from '../enumerations/tipo-sexo-enum';

/**
 * Modelo da entidade Usuário
 *
 * @interface Usuario
 */
interface Usuario {
  /**
   * Identificador
   */
  idUsuario?: number;

  /**
   * Nome
   */
  nmUsuario: string;

  /**
   * Número de telefone
   */
  nrTelefone: string;

  /**
   * Data de nascimento
   */
  dtNascimento: string;

  /**
   * Sexo
   */
  tpSexo: TipoSexoEnum;

  /**
   * E-mail
   */
  dsEmail: string;

  /**
   * Link da foto
   */
  dsLinkFoto?: string;

  /**
   * Base64 da foto
   */
  dsBase64Foto?: string;
}

export default Usuario;
