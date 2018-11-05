import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const baseRequest = config => async (symbol, market, funct) => {
  const query = {
    function: funct,
    symbol,
    market,
  };

  return requestCreator(config, query);
};

const digitalCurrency = config => ({
  daily: (symbol, market) =>
    baseRequest(config)(symbol, market, constants.DIGITAL_CURRENCY_DAILY),
  weekly: (symbol, market) =>
    baseRequest(config)(symbol, market, constants.DIGITAL_CURRENCY_WEEKLY),
  monthly: (symbol, market) =>
    baseRequest(config)(symbol, market, constants.DIGITAL_CURRENCY_MONTHLY),
});

export default config => digitalCurrency(config);
