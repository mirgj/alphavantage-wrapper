import * as constants from '../constants/index';
import responseTransformer from './responseTransformer';

describe('# responseTransformer', () => {
  describe('## CURRENCY_EXCHANGE_RATE', () => {
    it('it should transform the response into the expected format', async () => {
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

      const res = await responseTransformer(
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

    it('it should transform the response into the expected format and apprend the raw response', async () => {
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

      const res = await responseTransformer(
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

    it('it should not transform the response in case is not in the valid format', async () => {
      const response = {
        invalid: 'response',
      };

      const res = await responseTransformer(
        { injectRawResponse: true },
        response,
        constants.CURRENCY_EXCHANGE_RATE,
      );

      expect(res).toEqual(response);
    });
  });

  describe('## DIGITAL_CURRENCY_DAILY', () => {
    it('it should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Daily Prices and Volumes for Digital Currency',
          '2. Digital Currency Code': 'BTC',
          '3. Digital Currency Name': 'Bitcoin',
          '4. Market Code': 'CNY',
          '5. Market Name': 'Chinese Yuan',
          '6. Last Refreshed': '2018-10-24 (end of day)',
          '7. Time Zone': 'UTC',
        },
        'Time Series (Digital Currency Daily)': {
          '2018-10-24': {
            '1a. open (CNY)': '44754.37511913',
            '1b. open (USD)': '6450.23408373',
            '2a. high (CNY)': '46386.99556280',
            '2b. high (USD)': '6684.10143702',
            '3a. low (CNY)': '44466.86338862',
            '3b. low (USD)': '6408.34290333',
            '4a. close (CNY)': '45138.84408922',
            '4b. close (USD)': '6500.40957506',
            '5. volume': '2531.92572889',
            '6. market cap (USD)': '16458554.25141862',
          },
        },
      };

      const res = await responseTransformer(
        {},
        response,
        constants.DIGITAL_CURRENCY_DAILY,
      );

      expect(res).toEqual({
        description: 'Daily Prices and Volumes for Digital Currency',
        currency: {
          code: 'BTC',
          name: 'Bitcoin',
        },
        exchange: {
          code: 'CNY',
          name: 'Chinese Yuan',
        },
        lastRefreshed: '2018-10-24 23:59:59',
        timeZone: 'UTC',
        timeSeries: {
          '2018-10-24': {
            open: {
              CNY: '44754.37511913',
              USD: '6450.23408373',
            },
            high: {
              CNY: '46386.99556280',
              USD: '6684.10143702',
            },
            low: {
              CNY: '44466.86338862',
              USD: '6408.34290333',
            },
            close: {
              CNY: '45138.84408922',
              USD: '6500.40957506',
            },
            volume: '2531.92572889',
            marketCap: {
              USD: '16458554.25141862',
            },
          },
        },
      });
    });
  });
});
