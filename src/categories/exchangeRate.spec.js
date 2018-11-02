import querystring from 'querystring';
import exchangeRate from './exchangeRate';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# exchangeRate', () => {
  let config;

  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    querystring.stringify.mockReturnValue('a-query');
    config = {
      url: 'a-mocked-url',
    };
  });
  afterEach(() => {});
  it('it should call the exchange function correctly', async () => {
    const fn = exchangeRate(config);
    const result = await fn('USD', 'EUR');

    expect(result).toEqual('an-output');
    expect(querystring.stringify).toBeCalledWith({
      function: constants.CURRENCY_EXCHANGE_RATE,
      from_currency: 'USD',
      to_currency: 'EUR',
    });
    expect(requestCreator).toBeCalledWith(
      config,
      `${config.url}a-query`,
      constants.CURRENCY_EXCHANGE_RATE,
    );
  });
});
