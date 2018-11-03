import querystring from 'querystring';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const baseRequest = config => async (
  from,
  to,
  interval,
  outputSize,
  dataType,
  funct,
) => {
  const query = {
    function: funct,
    from_symbol: from,
    to_symbol: to,
  };

  if (interval) query.interval = interval;
  if (outputSize) query.outputsize = outputSize;
  if (dataType) query.datatype = dataType;

  const appendQuery = querystring.stringify(query);

  const result = await requestCreator(
    config,
    `${config.url}${appendQuery}`,
    funct,
  );

  return result;
};

const forex = config => ({
  intraday: (
    from,
    to,
    interval = '5min',
    outputSize = 'compact',
    dataType = 'json',
  ) =>
    baseRequest(config)(
      from,
      to,
      interval,
      outputSize,
      dataType,
      constants.FX_INTRADAY,
    ),
  daily: (from, to, outputSize = 'compact', dataType = 'json') =>
    baseRequest(config)(
      from,
      to,
      null,
      outputSize,
      dataType,
      constants.FX_DAILY,
    ),
  weekly: (from, to, dataType = 'json') =>
    baseRequest(config)(from, to, null, null, dataType, constants.FX_WEEKLY),
  monthly: (from, to, dataType = 'json') =>
    baseRequest(config)(from, to, null, null, dataType, constants.FX_MONTHLY),
});

export default config => forex(config);
