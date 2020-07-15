import Usuario from './usuario';

/**
 * Modelo da entidade Evento
 *
 * @interface Evento
 */
interface Evento {
  /**
   * Identificador
   */
  idEvento?: number;

  /**
   *
   */
  administrador: Usuario;

  /**
   * Título
   */
  dsTitulo: string;

  /**
   * Descrição
   */
  dsEvento: string;

  /**
   * Data de inicio
   */
  dtInicio: string;

  /**
   * Duração em horas
   */
  nrDuracao: number;

  /**
   * Link da foto
   */
  dsLinkFoto?: string;

  /**
   * Base64 da foto
   */
  dsBase64Foto?: string;

  /**
   * Rua
   */
  dsRua: string;

  /**
   * Bairro
   */
  dsBairro: string;

  /**
   * Número do endereço
   */
  nrEndereco: number;

  /**
   * CEP
   */
  nrCep: string;
}

export default Evento;
