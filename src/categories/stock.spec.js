import stock from './stock';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# stock', () => {
  let config;
  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    config = {
      url: 'a-mocked-url',
    };
  });

  afterEach(() => {
    requestCreator.mockClear();
  });

  it('should create the object correctly', () => {
    const fn = stock(config);

    expect(fn.quote).toEqual(expect.any(Function));
    expect(fn.intraday).toEqual(expect.any(Function));
    expect(fn.daily).toEqual(expect.any(Function));
    expect(fn.daily_adjusted).toEqual(expect.any(Function));
    expect(fn.weekly).toEqual(expect.any(Function));
    expect(fn.weekly_adjusted).toEqual(expect.any(Function));
    expect(fn.monthly).toEqual(expect.any(Function));
    // expect(fn.search).toEqual(expect.any(Function));
  });

  it('should call the quote function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.quote('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.GLOBAL_QUOTE,
      symbol: 'MSFT',
      datatype: 'json',
    });
  });

  it('should call the quote function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.quote('MSFT', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.GLOBAL_QUOTE,
      symbol: 'MSFT',
      datatype: 'csv',
    });
  });

  it('should call the intraday function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.intraday('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_INTRADAY,
      symbol: 'MSFT',
      interval: '5min',
      outputsize: 'compact',
      datatype: 'json',
    });
  });

  it('should call the intraday function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.intraday('MSFT', '1min', 'full', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_INTRADAY,
      symbol: 'MSFT',
      interval: '1min',
      outputsize: 'full',
      datatype: 'csv',
    });
  });

  it('should call the daily function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.daily('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_DAILY,
      symbol: 'MSFT',
      outputsize: 'compact',
      datatype: 'json',
    });
  });

  it('should call the daily function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.daily('MSFT', 'full', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_DAILY,
      symbol: 'MSFT',
      outputsize: 'full',
      datatype: 'csv',
    });
  });

  it('should call the daily adjusted function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.daily_adjusted('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_DAILY_ADJUSTED,
      symbol: 'MSFT',
      outputsize: 'compact',
      datatype: 'json',
    });
  });

  it('should call the daily adjusted function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.daily_adjusted('MSFT', 'full', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_DAILY_ADJUSTED,
      symbol: 'MSFT',
      outputsize: 'full',
      datatype: 'csv',
    });
  });

  it('should call the weekly function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.weekly('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_WEEKLY,
      symbol: 'MSFT',
      datatype: 'json',
    });
  });

  it('should call the weekly function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.weekly('MSFT', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_WEEKLY,
      symbol: 'MSFT',
      datatype: 'csv',
    });
  });

  it('should call the weekly adjusted function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.weekly_adjusted('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_WEEKLY_ADJUSTED,
      symbol: 'MSFT',
      datatype: 'json',
    });
  });

  it('should call the weekly adjusted function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.weekly_adjusted('MSFT', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_WEEKLY_ADJUSTED,
      symbol: 'MSFT',
      datatype: 'csv',
    });
  });

  it('should call the monthly function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.monthly('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_MONTHLY,
      symbol: 'MSFT',
      datatype: 'json',
    });
  });

  it('should call the monthly function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.monthly('MSFT', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.TIME_SERIES_MONTHLY,
      symbol: 'MSFT',
      datatype: 'csv',
    });
  });

  it.skip('should call the search function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.search('Micro');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.SYMBOL_SEARCH,
      keywords: 'Micro',
      datatype: 'json',
    });
  });

  it.skip('should call the quote data correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.search('Micro', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.SYMBOL_SEARCH,
      keywords: 'Micro',
      datatype: 'csv',
    });
  });
});
