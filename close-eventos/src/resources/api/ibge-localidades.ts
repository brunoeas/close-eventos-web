import RootApi from '../root-api';
import URL from '../URL';
import Municipio from '../../models/municipio';
import Estado from '../../models/estado';
import { AxiosResponse } from 'axios';

/**
 * Integração com a API do IBGE
 *
 * @see https://servicodados.ibge.gov.br/api/docs?versao=1
 * @class IBGEApi
 * @extends {RootApi}
 */
class IBGELocalidadesApi extends RootApi {
  /**
   * Injeta a URL e a base dos endpoints
   */
  public constructor() {
    super({ baseURL: URL.IBGE_API, baseEndpoint: '/localidades' });
  }

  /**
   * Busca os municípios filtrando pelo ID do UF
   *
   * @param {number} idUF - ID do UF
   * @returns {Promise<AxiosResponse<Municipio[]>>} Promise com a resposta contendo a lista de municipios
   */
  public async findMunicipiosByUF(idUF: number): Promise<AxiosResponse<Municipio[]>> {
    return this.api.get(`/estados/${idUF}/municipios`);
  }

  /**
   * Busca todos os UFs
   *
   * @returns {Promise<AxiosResponse<Estado[]>>} Promise com a resposta contendo a lista de todos os UFs
   */
  public async findAllUFs(): Promise<AxiosResponse<Estado[]>> {
    return this.api.get(`/estados`);
  }

  /**
   * Obtém o conjunto de municípios do Brasil a partir dos respectivos identificadores
   *
   * @param {number} id - ID do município
   * @returns {Promise<AxiosResponse<Municipio>>} Promise com a resposta contendo o município
   */
  public async findMunicipioById(id: number): Promise<AxiosResponse<Municipio>> {
    return this.api.get(`/municipios/${id}`);
  }

  /**
   * Obtém o conjunto de Unidades da Federação do Brasil a partir dos respectivos identificadores
   *
   * @param {number} id - ID do estado
   * @returns {Promise<AxiosResponse<Estado>>} Promise com a resposta contendo o estado
   */
  public async findEstadoById(id: number): Promise<AxiosResponse<Estado>> {
    return this.api.get(`/estados/${id}`);
  }
}

export default IBGELocalidadesApi;
