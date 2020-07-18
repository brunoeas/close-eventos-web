import GenericApi from '../generic-api';
import Evento from '../../models/evento';

/**
 * API do Evento
 *
 * @class EventoAPI
 * @extends {GenericApi<Evento>}
 */
class EventoAPI extends GenericApi<Evento> {
  public constructor() {
    super({ baseEndpoint: '/evento' });
  }
}

export default EventoAPI;
