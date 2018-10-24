import * as constants from '../constants/index';
import responseTransformer from './responseTransformer';

describe('# responseTransformer', () => {
  describe('## CURRENCY_EXCHANGE_RATE', () => {
    it('it should transform the response into the expected format', () => {
      const response = {
        'Realtime Currency Exchange Rate': {
          '1. From_Currency Code': 'BTC',
          '2. From_Currency Name': 'Bitcoin',
          '3. To_Currency Code': 'CNY',
          '4. To_Currency Name': 'Chinese Yuan',
          '5. Exchange Rate': '44820.00000000',
          '6. Last Refreshed': '2018-10-23 13:01:33',
          '7. Time Zone': 'UTC',
        },
      };

      const res = responseTransformer(
        {},
        response,
        constants.CURRENCY_EXCHANGE_RATE,
      );

      expect(res).toEqual({
        from: {
          code: 'BTC',
          name: 'Bitcoin',
        },
        to: {
          code: 'CNY',
          name: 'Chinese Yuan',
        },
        exchangeRate: '44820.00000000',
        lastRefresh: '2018-10-23 13:01:33',
        timeZone: 'UTC',
      });
    });

    it('it should transform the response into the expected format and apprend the raw response', () => {
      const response = {
        'Realtime Currency Exchange Rate': {
          '1. From_Currency Code': 'BTC',
          '2. From_Currency Name': 'Bitcoin',
          '3. To_Currency Code': 'CNY',
          '4. To_Currency Name': 'Chinese Yuan',
          '5. Exchange Rate': '44820.00000000',
          '6. Last Refreshed': '2018-10-23 13:01:33',
          '7. Time Zone': 'UTC',
        },
      };

      const res = responseTransformer(
        { injectRawResponse: true },
        response,
        constants.CURRENCY_EXCHANGE_RATE,
      );

      expect(res).toEqual({
        raw: response,
        from: {
          code: 'BTC',
          name: 'Bitcoin',
        },
        to: {
          code: 'CNY',
          name: 'Chinese Yuan',
        },
        exchangeRate: '44820.00000000',
        lastRefresh: '2018-10-23 13:01:33',
        timeZone: 'UTC',
      });
    });

    it('it should not transform the response in case is not in the valid format', () => {
      const response = {
        invalid: 'response',
      };

      const res = responseTransformer(
        { injectRawResponse: true },
        response,
        constants.CURRENCY_EXCHANGE_RATE,
      );

      expect(res).toEqual(response);
    });
  });
});
