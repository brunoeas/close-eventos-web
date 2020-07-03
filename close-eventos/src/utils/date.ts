import MomentUtils from '@date-io/moment';

/**
 * Útils para datas
 *
 * @class DateUtils
 * @extends {MomentUtils}
 */
class DateUtils extends MomentUtils {
  /**
   * Construtor padrão
   */
  public constructor() {
    super();
    this.moment.locale('pt-BR');
  }
}

export default DateUtils;
