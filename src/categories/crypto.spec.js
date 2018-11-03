import querystring from 'querystring';
import crypto from './crypto';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# crypto', () => {
  let config;
  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    querystring.stringify.mockReturnValue('a-query');
    config = {
      url: 'a-mocked-url',
    };
  });

  afterEach(() => {
    requestCreator.mockClear();
    querystring.stringify.mockClear();
  });

  it('should call the daily data correctly', async () => {
    const fn = crypto(config);
    const result = await fn.daily('BTC', 'EUR');

    expect(result).toEqual('an-output');
    expect(querystring.stringify).toBeCalledWith({
      function: constants.DIGITAL_CURRENCY_DAILY,
      symbol: 'BTC',
      market: 'EUR',
    });
    expect(requestCreator).toBeCalledWith(
      config,
      `${config.url}a-query`,
      constants.DIGITAL_CURRENCY_DAILY,
    );
  });

  it('should call the weekly data correctly', async () => {
    const fn = crypto(config);
    const result = await fn.weekly('BTC', 'EUR');

    expect(result).toEqual('an-output');
    expect(querystring.stringify).toBeCalledWith({
      function: constants.DIGITAL_CURRENCY_WEEKLY,
      symbol: 'BTC',
      market: 'EUR',
    });
    expect(requestCreator).toBeCalledWith(
      config,
      `${config.url}a-query`,
      constants.DIGITAL_CURRENCY_WEEKLY,
    );
  });

  it('should call the monthly data correctly', async () => {
    const fn = crypto(config);
    const result = await fn.monthly('BTC', 'EUR');

    expect(result).toEqual('an-output');
    expect(querystring.stringify).toBeCalledWith({
      function: constants.DIGITAL_CURRENCY_MONTHLY,
      symbol: 'BTC',
      market: 'EUR',
    });
    expect(requestCreator).toBeCalledWith(
      config,
      `${config.url}a-query`,
      constants.DIGITAL_CURRENCY_MONTHLY,
    );
  });
});
