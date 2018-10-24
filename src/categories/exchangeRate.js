import querystring from 'querystring';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const exchange = config => async (from, to) => {
  const appendQuery = querystring.stringify({
    function: constants.CURRENCY_EXCHANGE_RATE,
    from_currency: from,
    to_currency: to,
  });

  const result = await requestCreator(
    config,
    `${config.url}${appendQuery}`,
    constants.CURRENCY_EXCHANGE_RATE,
  );

  return result;
};

export default config => exchange(config);
