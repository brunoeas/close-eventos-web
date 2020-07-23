/**
 * Responsável pela memória das URL's das API's do sistema
 *
 * @abstract
 */
abstract class URL {
  /**
   * URL da API principal
   *
   * @static
   */
  public static readonly MAIN_API = 'http://localhost:2210';

  /**
   * URL da API do IBGE (Instituto Brasileiro de Geografia e Estatistica)
   *
   * @static
   */
  public static readonly IBGE_API = 'https://servicodados.ibge.gov.br/api/v1';
}

export default URL;
