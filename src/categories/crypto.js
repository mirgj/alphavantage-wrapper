import querystring from 'querystring';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const baseRequest = config => async (symbol, market, funct) => {
  const appendQuery = querystring.stringify({
    function: funct,
    symbol,
    market,
  });

  const result = await requestCreator(
    config,
    `${config.url}${appendQuery}`,
    funct,
  );

  return result;
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
