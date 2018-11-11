import crypto from './crypto';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# crypto', () => {
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
    const fn = crypto(config);

    expect(fn.daily).toEqual(expect.any(Function));
    expect(fn.weekly).toEqual(expect.any(Function));
    expect(fn.monthly).toEqual(expect.any(Function));
  });

  it('should call the daily data correctly', async () => {
    const fn = crypto(config);
    const result = await fn.daily('BTC', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.DIGITAL_CURRENCY_DAILY,
      symbol: 'BTC',
      market: 'EUR',
    });
  });

  it('should call the weekly data correctly', async () => {
    const fn = crypto(config);
    const result = await fn.weekly('BTC', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.DIGITAL_CURRENCY_WEEKLY,
      symbol: 'BTC',
      market: 'EUR',
    });
  });

  it('should call the monthly data correctly', async () => {
    const fn = crypto(config);
    const result = await fn.monthly('BTC', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.DIGITAL_CURRENCY_MONTHLY,
      symbol: 'BTC',
      market: 'EUR',
    });
  });
});
