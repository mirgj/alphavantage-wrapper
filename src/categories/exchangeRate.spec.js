import exchangeRate from './exchangeRate';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');

describe('# exchangeRate', () => {
  let config;

  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    config = {
      url: 'a-mocked-url',
    };
  });
  afterEach(() => {});
  it('it should call the exchange function correctly', async () => {
    const fn = exchangeRate(config);
    const result = await fn('USD', 'EUR');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.CURRENCY_EXCHANGE_RATE,
      from_currency: 'USD',
      to_currency: 'EUR',
    });
  });
});
