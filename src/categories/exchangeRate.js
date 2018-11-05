import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const exchange = config => async (from, to) => {
  const query = {
    function: constants.CURRENCY_EXCHANGE_RATE,
    from_currency: from,
    to_currency: to,
  };

  return requestCreator(config, query);
};

export default config => exchange(config);
