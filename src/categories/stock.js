import requestCreator from '../utils/requestCreator';
import validators from '../validators/index';
import * as constants from '../constants/index';

const execute = config => (
  symbol,
  interval,
  outputSize,
  keywords,
  dataType,
  fn,
) => {
  const validate = !!config.validate || false;

  if (validate) {
    validators(dataType, 'dataType');

    if (interval) validators(interval, 'interval');
    if (outputSize) validators(outputSize, 'outputSize');
  }

  const query = {
    function: fn,
    datatype: dataType,
  };

  if (interval) query.interval = interval;
  if (outputSize) query.outputsize = outputSize;
  if (symbol) query.symbol = symbol;
  if (keywords) query.keywords = keywords;

  return requestCreator(config, query);
};

const stock = config => ({
  intraday: (
    symbol,
    interval = '5min',
    outputsize = 'compact',
    dataType = 'json',
  ) =>
    execute(config)(
      symbol,
      interval,
      outputsize,
      null,
      dataType,
      constants.TIME_SERIES_INTRADAY,
    ),
  daily: (symbol, outputsize = 'compact', dataType = 'json') =>
    execute(config)(
      symbol,
      null,
      outputsize,
      null,
      dataType,
      constants.TIME_SERIES_DAILY,
    ),
  daily_adjusted: (symbol, outputsize = 'compact', dataType = 'json') =>
    execute(config)(
      symbol,
      null,
      outputsize,
      null,
      dataType,
      constants.TIME_SERIES_DAILY_ADJUSTED,
    ),
  weekly: (symbol, dataType = 'json') =>
    execute(config)(
      symbol,
      null,
      null,
      null,
      dataType,
      constants.TIME_SERIES_WEEKLY,
    ),
  monthly: (symbol, dataType = 'json') =>
    execute(config)(
      symbol,
      null,
      null,
      null,
      dataType,
      constants.TIME_SERIES_MONTHLY,
    ),
  quote: (symbol, dataType = 'json') =>
    execute(config)(symbol, null, null, null, dataType, constants.GLOBAL_QUOTE),
  // search: (keywords, dataType = 'json') =>
  //   execute(config)(
  //     null,
  //     null,
  //     null,
  //     keywords,
  //     dataType,
  //     constants.SYMBOL_SEARCH,
  //   ),
});

export default stock;
