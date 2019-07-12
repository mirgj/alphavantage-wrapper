import requestCreator from '../utils/requestCreator';
import validators from '../validators/index';
import * as constants from '../constants/index';

const exchange = config => (from, to) => {
  const validate = !!config.validate || false;

  if (validate) {
    validators(from, 'digitalPhysicalCurrency');
    validators(to, 'digitalPhysicalCurrency');
  }

  const query = {
    function: constants.CURRENCY_EXCHANGE_RATE,
    from_currency: from,
    to_currency: to,
  };

  return requestCreator(config, query);
};

export default exchange;
