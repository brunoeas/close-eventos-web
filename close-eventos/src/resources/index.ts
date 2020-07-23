import axios from 'axios';
import Usuario from '../models/usuario';
import Token from '../models/token';
import deepClone from '../utils/deep-clone';

/**
 * Responsável pela manipulação do token de autenticação e dos dados do usuário logado
 *
 * @class Authentication
 */
class Authentication {
  /**
   * Key to token no localStorage
   */
  private static readonly TOKEN_KEY = 'token';

  /**
   * Memória dos dados do usuário logado
   */
  private static usuarioLogado: Usuario | null = null;

  /*
   * Inicializa interceptors ao iniciar o uso do sistema
   */
  public static initInterceptors() {
    axios.interceptors.request.use(undefined, (err) => {
      let errInJson: any;
      try {
        errInJson = JSON.stringify(err, null, 2);
      } catch (stringifyErr) {
        errInJson = null;
      }

      console.error('> Ocorreu um erro em uma request: \n', err, '\n', errInJson ?? '');

      return Promise.reject(err);
    });
  }

  /**
   * @returns {(Token | null)} Token de autenticação do localStorage
   */
  public static getToken(): Token | null {
    const stringObj = localStorage.getItem(Authentication.TOKEN_KEY);
    return stringObj ? JSON.parse(stringObj) : null;
  }

  /**
   * Setta o token de autenticação no localStorage
   *
   * @param {Token} token - Token
   */
  public static setToken(token: Token) {
    localStorage.setItem(Authentication.TOKEN_KEY, JSON.stringify(token));
  }

  /**
   * Setta os dados do usuário que está logado
   *
   * @static
   * @param {Usuario} usuario - Dados do usuário
   */
  public static setUsuarioLogado(usuario: Usuario) {
    Authentication.usuarioLogado = deepClone(usuario);
  }

  /**
   * @static
   * @returns {(Usuario | null)} Dados do usuário que está logado
   */
  public static getUsuarioLogado(): Usuario | null {
    return deepClone(Authentication.usuarioLogado);
  }

  /**
   * Limpa os dados do usuário logado e do token
   *
   * @static
   */
  public static clear() {
    Authentication.usuarioLogado = null;
    localStorage.setItem(Authentication.TOKEN_KEY, '');
  }
}

export default Authentication;
