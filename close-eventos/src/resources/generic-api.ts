import { AxiosResponse } from 'axios';
import RootApi from './root-api';

/**
 * Modelo de métodos de uma classe para comunicação com uma API.
 * Para implementar algum destes método customizado apenas reescreva-o
 * usando a mesma assinatura na classe que for extender esta.
 *
 * @interface GenericApi
 * @template E - Tipo da entidade que vai trafegar na comunicação com a API
 */
abstract class GenericApi<E> extends RootApi {
  /**
   * Salva um novo objeto da entidade
   *
   * @param {E} values - Valores para salvar
   * @returns {Promise<AxiosResponse<E>>} Promise com a resposta e o objeto da entidade com o seus dados novos persistidos
   */
  public async save(values: E): Promise<AxiosResponse<E>> {
    return this.api.post<E>('/', values);
  }

  /**
   * Atualiza os dados de um objeto da entidade
   *
   * @param {E} values - Valores para atualizar
   * @returns {Promise<AxiosResponse<E>>} Promise com a resposta e o objeto da entidade atualizado
   */
  public async update(values: E): Promise<AxiosResponse<E>> {
    return this.api.put<E>('/', values);
  }

  /**
   * @returns {Promise<AxiosResponse<E[]>>} Promise com a resposta com a lista de todos os objetos da entidade
   */
  public async findAll(): Promise<AxiosResponse<E[]>> {
    return this.api.get<E[]>('/');
  }

  /**
   * Busca um objeto da entidade pelo ID
   *
   * @template T - Tipo da propriedade identificadora da entidade, por padrão assume "number"
   * @param {T} id - ID para buscar
   * @returns {Promise<AxiosResponse<E>>} Promise com a resposta com o objeto da entidade referente aquele ID
   */
  public async findById<T = number>(id: T): Promise<AxiosResponse<E>> {
    return this.api.get<E>(`/${id}`);
  }

  /**
   * Deleta um objeto da entidade pelo ID
   *
   * @template T - Tipo da propriedade identificadora da entidade, por padrão assume "number"
   * @param {T} id - ID do objeto que vai ser deletado
   * @returns {Promise<AxiosResponse<void>>} Promise com a resposta da request
   */
  public async deleteById<T = number>(id: T): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(`/${id}`);
  }
}

export default GenericApi;
