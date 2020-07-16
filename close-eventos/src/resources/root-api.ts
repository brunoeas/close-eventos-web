import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import URL from './URL';

/**
 * Modelo de configurações da instância do Axios
 *
 * @extends {AxiosRequestConfig}
 */
export interface RootApiConfigs extends AxiosRequestConfig {
  baseEndpoint?: string;
}

/**
 * Classe base para ser extendida pelas classes que fazem comunicações com uma API
 *
 * @abstract Não pode ser instânciada, apenas extendida
 */
abstract class RootApi {
  /**
   * Memória da instância do Axios
   *
   * @protected - Apenas esta classe e classes que a extendem podem acessá-la
   * @type {AxiosInstance}
   */
  protected readonly api: AxiosInstance;

  /**
   * Construtor protegido que injeta a instância do Axios
   *
   * @param {RootApiConfigs} [configs={}] - Configurações para criação da instância do axios
   */
  protected constructor(configs: RootApiConfigs = {}) {
    const baseURL = `${configs.baseURL ?? URL.MAIN_API}${configs.baseEndpoint ?? ''}`;
    this.api = axios.create({ ...configs, baseURL });
  }
}

export default RootApi;
