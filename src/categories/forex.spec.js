import forex from './forex';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# forex', () => {
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
    const fn = forex(config);

    expect(fn.intraday).toEqual(expect.any(Function));
    expect(fn.daily).toEqual(expect.any(Function));
    expect(fn.weekly).toEqual(expect.any(Function));
    expect(fn.monthly).toEqual(expect.any(Function));
  });

  it('should call the intraday data correctly with default parameters', async () => {
    const fn = forex(config);
    const result = await fn.intraday('USD', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_INTRADAY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'json',
      interval: '5min',
      outputsize: 'compact',
    });
  });

  it('should call the intraday data correctly with custom parameters', async () => {
    const fn = forex(config);
    const result = await fn.intraday('USD', 'EUR', 'a-interval', 'full', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_INTRADAY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'csv',
      interval: 'a-interval',
      outputsize: 'full',
    });
  });

  it('should call the daily data correctly with default parameters', async () => {
    const fn = forex(config);
    const result = await fn.daily('USD', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_DAILY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'json',
      outputsize: 'compact',
    });
  });

  it('should call the daily data correctly with custom parameters', async () => {
    const fn = forex(config);
    const result = await fn.daily('USD', 'EUR', 'full', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_DAILY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'csv',
      outputsize: 'full',
    });
  });

  it('should call the weekly data correctly with default parameters', async () => {
    const fn = forex(config);
    const result = await fn.weekly('USD', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_WEEKLY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'json',
    });
  });

  it('should call the weekly data correctly with custom parameters', async () => {
    const fn = forex(config);
    const result = await fn.weekly('USD', 'EUR', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_WEEKLY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'csv',
    });
  });

  it('should call the monthly data correctly with default parameters', async () => {
    const fn = forex(config);
    const result = await fn.monthly('USD', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_MONTHLY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'json',
    });
  });

  it('should call the monthly data correctly with custom parameters', async () => {
    const fn = forex(config);
    const result = await fn.monthly('USD', 'EUR', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.FX_MONTHLY,
      from_symbol: 'USD',
      to_symbol: 'EUR',
      datatype: 'csv',
    });
  });
});
