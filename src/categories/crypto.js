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

const digitalCurrency = config => async (symbol, market, frequency) => {
  let result;
  switch (frequency) {
    case 'monthly':
      result = await baseRequest(config)(
        symbol,
        market,
        constants.DIGITAL_CURRENCY_MONTHLY,
      );
      break;
    case 'weekly':
      result = await baseRequest(config)(
        symbol,
        market,
        constants.DIGITAL_CURRENCY_WEEKLY,
      );
      break;
    case 'daily':
    default:
      result = await baseRequest(config)(
        symbol,
        market,
        constants.DIGITAL_CURRENCY_DAILY,
      );
  }

  return result;
};

export default config => digitalCurrency(config);
