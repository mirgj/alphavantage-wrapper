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
          '2018-10-23': {
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
          '2018-10-23': {
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

  describe('## FX_INTRADAY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'FX Intraday (5min) Time Series',
          '2. From Symbol': 'EUR',
          '3. To Symbol': 'USD',
          '4. Last Refreshed': '2018-11-02 21:15:00',
          '5. Interval': '5min',
          '6. Output Size': 'Compact',
          '7. Time Zone': 'UTC',
        },
        'Time Series FX (5min)': {
          '2018-11-02 21:15:00': {
            '1. open': '1.1387',
            '2. high': '1.1387',
            '3. low': '1.1387',
            '4. close': '1.1387',
          },
          '2018-11-02 21:10:00': {
            '1. open': '1.1386',
            '2. high': '1.1386',
            '3. low': '1.1386',
            '4. close': '1.1386',
          },
        },
      };
      const res = await responseTransformer(
        {},
        response,
        constants.FX_INTRADAY,
      );

      expect(res).toEqual({
        description: 'FX Intraday (5min) Time Series',
        from: {
          code: 'EUR',
        },
        to: {
          code: 'USD',
        },
        lastRefreshed: '2018-11-02 21:15:00',
        timeZone: 'UTC',
        interval: '5min',
        outputType: 'Compact',
        timeSeries: {
          '2018-11-02 21:15:00': {
            open: '1.1387',
            high: '1.1387',
            low: '1.1387',
            close: '1.1387',
          },
          '2018-11-02 21:10:00': {
            open: '1.1386',
            high: '1.1386',
            low: '1.1386',
            close: '1.1386',
          },
        },
      });
    });
  });

  describe('## FX_DAILY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Forex Daily Prices (open, high, low, close)',
          '2. From Symbol': 'EUR',
          '3. To Symbol': 'USD',
          '4. Output Size': 'Compact',
          '5. Last Refreshed': '2018-11-03 05:15:00',
          '6. Time Zone': 'GMT+8',
        },
        'Time Series FX (Daily)': {
          '2018-11-03': {
            '1. open': '1.1378',
            '2. high': '1.1400',
            '3. low': '1.1371',
            '4. close': '1.1387',
          },
          '2018-11-02': {
            '1. open': '1.1404',
            '2. high': '1.1456',
            '3. low': '1.1371',
            '4. close': '1.1387',
          },
        },
      };
      const res = await responseTransformer({}, response, constants.FX_DAILY);

      expect(res).toEqual({
        description: 'Forex Daily Prices (open, high, low, close)',
        from: {
          code: 'EUR',
        },
        to: {
          code: 'USD',
        },
        lastRefreshed: '2018-11-03 05:15:00',
        timeZone: 'GMT+8',
        outputType: 'Compact',
        timeSeries: {
          '2018-11-03': {
            open: '1.1378',
            high: '1.1400',
            low: '1.1371',
            close: '1.1387',
          },
          '2018-11-02': {
            open: '1.1404',
            high: '1.1456',
            low: '1.1371',
            close: '1.1387',
          },
        },
      });
    });
  });

  describe('## FX_WEEKLY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Forex Weekly Prices (open, high, low, close)',
          '2. From Symbol': 'EUR',
          '3. To Symbol': 'USD',
          '4. Last Refreshed': '2018-11-03 05:15:00',
          '5. Time Zone': 'GMT+8',
        },
        'Time Series FX (Weekly)': {
          '2018-11-03': {
            '1. open': '1.1404',
            '2. high': '1.1456',
            '3. low': '1.1300',
            '4. close': '1.1387',
          },
          '2018-10-28': {
            '1. open': '1.1512',
            '2. high': '1.1550',
            '3. low': '1.1334',
            '4. close': '1.1403',
          },
        },
      };
      const res = await responseTransformer({}, response, constants.FX_WEEKLY);

      expect(res).toEqual({
        description: 'Forex Weekly Prices (open, high, low, close)',
        from: {
          code: 'EUR',
        },
        to: {
          code: 'USD',
        },
        lastRefreshed: '2018-11-03 05:15:00',
        timeZone: 'GMT+8',
        timeSeries: {
          '2018-11-03': {
            open: '1.1404',
            high: '1.1456',
            low: '1.1300',
            close: '1.1387',
          },
          '2018-10-28': {
            open: '1.1512',
            high: '1.1550',
            low: '1.1334',
            close: '1.1403',
          },
        },
      });
    });
  });

  describe('## FX_MONTHLY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Forex Monthly Prices (open, high, low, close)',
          '2. From Symbol': 'EUR',
          '3. To Symbol': 'USD',
          '4. Last Refreshed': '2018-11-03 05:15:00',
          '5. Time Zone': 'GMT+8',
        },
        'Time Series FX (Monthly)': {
          '2018-11-03': {
            '1. open': '1.1317',
            '2. high': '1.1456',
            '3. low': '1.1311',
            '4. close': '1.1387',
          },
          '2018-10-31': {
            '1. open': '1.1605',
            '2. high': '1.1625',
            '3. low': '1.1300',
            '4. close': '1.1317',
          },
        },
      };
      const res = await responseTransformer({}, response, constants.FX_WEEKLY);

      expect(res).toEqual({
        description: 'Forex Monthly Prices (open, high, low, close)',
        from: {
          code: 'EUR',
        },
        to: {
          code: 'USD',
        },
        lastRefreshed: '2018-11-03 05:15:00',
        timeZone: 'GMT+8',
        timeSeries: {
          '2018-11-03': {
            open: '1.1317',
            high: '1.1456',
            low: '1.1311',
            close: '1.1387',
          },
          '2018-10-31': {
            open: '1.1605',
            high: '1.1625',
            low: '1.1300',
            close: '1.1317',
          },
        },
      });
    });
  });
});
