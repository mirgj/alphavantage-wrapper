import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const execute = config => async (
  from,
  to,
  interval,
  outputSize,
  dataType,
  fn,
) => {
  const query = {
    function: fn,
    from_symbol: from,
    to_symbol: to,
  };

  if (interval) query.interval = interval;
  if (outputSize) query.outputsize = outputSize;
  if (dataType) query.datatype = dataType;

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

export default config => forex(config);
