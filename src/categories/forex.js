import requestCreator from '../utils/requestCreator';
import validators from '../validators/index';
import * as constants from '../constants/index';

const execute = config => (from, to, interval, outputSize, dataType, fn) => {
  const validate = !!config.validate || false;

  if (validate) {
    validators(from, 'physicalCurrency');
    validators(to, 'physicalCurrency');
    validators(dataType, 'dataType');

    if (interval) validators(interval, 'interval');
    if (outputSize) validators(outputSize, 'outputSize');
  }

  const query = {
    function: fn,
    from_symbol: from,
    to_symbol: to,
    datatype: dataType,
  };

  if (interval) query.interval = interval;
  if (outputSize) query.outputsize = outputSize;

  return requestCreator(config, query);
};

const forex = config => ({
  intraday: (
    from,
    to,
    interval = '5min',
    outputSize = 'compact',
    dataType = 'json',
  ) =>
    execute(config)(
      from,
      to,
      interval,
      outputSize,
      dataType,
      constants.FX_INTRADAY,
    ),
  daily: (from, to, outputSize = 'compact', dataType = 'json') =>
    execute(config)(from, to, null, outputSize, dataType, constants.FX_DAILY),
  weekly: (from, to, dataType = 'json') =>
    execute(config)(from, to, null, null, dataType, constants.FX_WEEKLY),
  monthly: (from, to, dataType = 'json') =>
    execute(config)(from, to, null, null, dataType, constants.FX_MONTHLY),
});

export default forex;
