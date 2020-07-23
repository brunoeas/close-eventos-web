import GenericApi from '../generic-api';
import Evento from '../../models/evento';
import { AxiosResponse } from 'axios';

/**
 * API do Evento
 *
 * @class EventoAPI
 * @extends {GenericApi<Evento>}
 */
class EventoAPI extends GenericApi<Evento> {
  /**
   * Injeta a base dos endpoints dessa API
   */
  public constructor() {
    super({ baseEndpoint: '/evento' });
  }

  /**
   * Chama o endpoint para adicionar um participante à um evento
   *
   * @param {number} idEvento - ID do evento
   * @param {number} idUsuario - ID do usuário/participante
   * @returns {Promise<AxiosResponse<void>>} Promise void
   */
  public async addParticipante(idEvento: number, idUsuario: number): Promise<AxiosResponse<void>> {
    return this.api.post<void>(`/${idEvento}/${idUsuario}`);
  }

  /**
   * Chama o endpoint para remover um participante de um evento
   *
   * @param {number} idEvento - ID do evento
   * @param {number} idUsuario - ID do usuário
   * @returns {Promise<AxiosResponse<void>>} Promise void
   */
  public async removeParticipante(idEvento: number, idUsuario: number): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(`/${idEvento}/${idUsuario}`);
  }
}

export default EventoAPI;
