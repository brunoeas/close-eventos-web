import GenericApi from '../generic-api';
import Usuario from '../../models/usuario';
import Token from '../../models/token';
import axios, { AxiosResponse } from 'axios';
import URL from '../URL';

/**
 * API do Usuário
 *
 * @class UsuarioAPI
 * @extends {GenericApi<Usuario>}
 */
class UsuarioAPI extends GenericApi<Usuario> {
  /**
   * Injeta a base dos endpoints dessa API
   */
  public constructor() {
    super({ baseEndpoint: '/usuario' });
  }

  /**
   * Chama o endpoint para validar o login
   *
   * @param {Token} dto - DTO com os dados para o login
   * @returns {Promise<AxiosResponse<void>>} Promise void
   */
  public async login(dto: Token): Promise<AxiosResponse<void>> {
    return axios.post<void>(`${URL.MAIN_API}/no-auth/usuario/login`, dto);
  }

  /**
   * Chama o endpoint para retornar o usuário logado
   *
   * @returns {Promise<AxiosResponse<Usuario>>} Promise com o usuário logado
   */
  public async findPerfil(): Promise<AxiosResponse<Usuario>> {
    return this.api.get<Usuario>('/perfil');
  }
}

export default UsuarioAPI;
