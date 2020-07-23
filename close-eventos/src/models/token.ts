/**
 * Modelo do token de autenticação
 *
 * @interface Token
 */
interface Token {
  /**
   * E-mail
   */
  dsEmail: string;

  /**
   * Senha
   */
  dsSenha: string;
}

export default Token;
