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
          '8. Bid Price': '108.28000000',
          '9. Ask Price': '108.29000000',
        },
      };

      const res = await responseTransformer(
        {
          parse: 'transform',
        },
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
        lastRefreshed: '2018-10-23 13:01:33',
        timeZone: 'UTC',
        bidPrice: '108.28000000',
        askPrice: '108.29000000',
      });
    });

    it('it should transform the response into the expected format and append the raw response', async () => {
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
        {
          injectRawResponse: true,
          parse: 'transform',
        },
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
        lastRefreshed: '2018-10-23 13:01:33',
        timeZone: 'UTC',
      });
    });

    it('it should not transform the response in case is not in the valid format', async () => {
      const response = {
        invalid: 'response',
      };

      const res = await responseTransformer(
        {
          injectRawResponse: true,
          parse: 'transform',
        },
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
        {
          parse: 'transform',
        },
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
            CNY: {
              close: '45138.84408922',
              high: '46386.99556280',
              low: '44466.86338862',
              open: '44754.37511913',
            },
            USD: {
              close: '6500.40957506',
              high: '6684.10143702',
              low: '6408.34290333',
              marketCap: '16458554.25141862',
              open: '6450.23408373',
            },
            volume: '2531.92572889',
          },
          '2018-10-23': {
            CNY: {
              close: '45138.84408922',
              high: '46386.99556280',
              low: '44466.86338862',
              open: '44754.37511913',
            },
            USD: {
              close: '6500.40957506',
              high: '6684.10143702',
              low: '6408.34290333',
              marketCap: '16458554.25141862',
              open: '6450.23408373',
            },
            volume: '2531.92572889',
          },
        },
      });
    });
  });

  describe('## DIGITAL_CURRENCY_WEEKLY', () => {
    it('it should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Weekly Prices and Volumes for Digital Currency',
          '2. Digital Currency Code': 'BTC',
          '3. Digital Currency Name': 'Bitcoin',
          '4. Market Code': 'CNY',
          '5. Market Name': 'Chinese Yuan',
          '6. Last Refreshed': '2018-10-24 (end of day)',
          '7. Time Zone': 'UTC',
        },
        'Time Series (Digital Currency Weekly)': {
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
          '2018-10-17': {
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
        {
          parse: 'transform',
        },
        response,
        constants.DIGITAL_CURRENCY_WEEKLY,
      );

      expect(res).toEqual({
        description: 'Weekly Prices and Volumes for Digital Currency',
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
            CNY: {
              close: '45138.84408922',
              high: '46386.99556280',
              low: '44466.86338862',
              open: '44754.37511913',
            },
            USD: {
              close: '6500.40957506',
              high: '6684.10143702',
              low: '6408.34290333',
              marketCap: '16458554.25141862',
              open: '6450.23408373',
            },
            volume: '2531.92572889',
          },
          '2018-10-17': {
            CNY: {
              close: '45138.84408922',
              high: '46386.99556280',
              low: '44466.86338862',
              open: '44754.37511913',
            },
            USD: {
              close: '6500.40957506',
              high: '6684.10143702',
              low: '6408.34290333',
              marketCap: '16458554.25141862',
              open: '6450.23408373',
            },
            volume: '2531.92572889',
          },
        },
      });
    });
  });

  describe('## DIGITAL_CURRENCY_MONTHLY', () => {
    it('it should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Monthly Prices and Volumes for Digital Currency',
          '2. Digital Currency Code': 'BTC',
          '3. Digital Currency Name': 'Bitcoin',
          '4. Market Code': 'CNY',
          '5. Market Name': 'Chinese Yuan',
          '6. Last Refreshed': '2018-10-24 (end of day)',
          '7. Time Zone': 'UTC',
        },
        'Time Series (Digital Currency Monthly)': {
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
          '2018-09-24': {
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
        {
          parse: 'transform',
        },
        response,
        constants.DIGITAL_CURRENCY_MONTHLY,
      );

      expect(res).toEqual({
        description: 'Monthly Prices and Volumes for Digital Currency',
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
            CNY: {
              close: '45138.84408922',
              high: '46386.99556280',
              low: '44466.86338862',
              open: '44754.37511913',
            },
            USD: {
              close: '6500.40957506',
              high: '6684.10143702',
              low: '6408.34290333',
              marketCap: '16458554.25141862',
              open: '6450.23408373',
            },
            volume: '2531.92572889',
          },
          '2018-09-24': {
            CNY: {
              close: '45138.84408922',
              high: '46386.99556280',
              low: '44466.86338862',
              open: '44754.37511913',
            },
            USD: {
              close: '6500.40957506',
              high: '6684.10143702',
              low: '6408.34290333',
              marketCap: '16458554.25141862',
              open: '6450.23408373',
            },
            volume: '2531.92572889',
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
        {
          parse: 'transform',
        },
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
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.FX_DAILY,
      );

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
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.FX_WEEKLY,
      );

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
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.FX_MONTHLY,
      );

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

  describe('## SECTOR', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          Information: 'US Sector Performance (realtime & historical)',
          'Last Refreshed': '10:37 AM ET 07/12/2019',
        },
        'Rank A: Real-Time Performance': {
          Industrials: '1.13%',
          Materials: '0.79%',
          'Consumer Discretionary': '0.74%',
          Energy: '0.62%',
          'Information Technology': '0.27%',
          'Consumer Staples': '0.19%',
          Financials: '0.06%',
          'Communication Services': '-0.02%',
          'Real Estate': '-0.44%',
          Utilities: '-0.79%',
          'Health Care': '-0.97%',
        },
        'Rank B: 1 Day Performance': {
          Industrials: '0.71%',
          Financials: '0.60%',
          Materials: '0.43%',
          'Information Technology': '0.34%',
          'Consumer Staples': '0.25%',
          Energy: '0.18%',
          'Consumer Discretionary': '0.16%',
          Utilities: '0.04%',
          'Health Care': '0.02%',
          'Communication Services': '-0.09%',
          'Real Estate': '-1.21%',
        },
        'Rank C: 5 Day Performance': {
          Energy: '1.89%',
          'Consumer Discretionary': '1.19%',
          'Communication Services': '0.74%',
          'Information Technology': '0.53%',
          Utilities: '0.36%',
          Financials: '0.23%',
          'Consumer Staples': '0.07%',
          'Real Estate': '-0.37%',
          'Health Care': '-0.98%',
          Industrials: '-1.05%',
          Materials: '-2.34%',
        },
        'Rank D: 1 Month Performance': {
          'Communication Services': '6.87%',
          'Consumer Discretionary': '5.66%',
          Energy: '5.31%',
          'Information Technology': '4.94%',
          Financials: '3.20%',
          Utilities: '2.96%',
          'Health Care': '2.71%',
          'Consumer Staples': '2.42%',
          Industrials: '1.96%',
          'Real Estate': '1.58%',
          Materials: '0.73%',
        },
        'Rank E: 3 Month Performance': {
          'Consumer Staples': '6.29%',
          Financials: '6.25%',
          Utilities: '5.92%',
          'Information Technology': '5.47%',
          'Consumer Discretionary': '4.89%',
          'Communication Services': '4.34%',
          'Real Estate': '3.39%',
          'Health Care': '1.88%',
          Industrials: '1.85%',
          Materials: '0.85%',
          Energy: '-4.69%',
        },
        'Rank F: Year-to-Date (YTD) Performance': {
          'Information Technology': '29.86%',
          'Consumer Discretionary': '24.82%',
          'Communication Services': '22.25%',
          'Real Estate': '21.61%',
          Industrials: '19.69%',
          Financials: '17.99%',
          'Consumer Staples': '17.62%',
          Utilities: '15.23%',
          Materials: '14.44%',
          Energy: '12.04%',
          'Health Care': '8.10%',
        },
        'Rank G: 1 Year Performance': {
          Utilities: '17.32%',
          'Real Estate': '14.36%',
          'Consumer Staples': '13.51%',
          'Communication Services': '12.45%',
          'Information Technology': '12.17%',
          'Consumer Discretionary': '9.57%',
          'Health Care': '7.55%',
          Industrials: '4.75%',
          Financials: '3.52%',
          Materials: '-2.74%',
          Energy: '-16.95%',
        },
        'Rank H: 3 Year Performance': {
          'Information Technology': '94.58%',
          'Consumer Discretionary': '52.38%',
          Financials: '51.13%',
          Industrials: '30.34%',
          'Health Care': '27.20%',
          Materials: '23.13%',
          Utilities: '15.99%',
          'Consumer Staples': '7.47%',
          Energy: '-6.66%',
          'Communication Services': '-6.68%',
        },
        'Rank I: 5 Year Performance': {
          'Information Technology': '121.73%',
          'Consumer Discretionary': '83.09%',
          Financials: '53.00%',
          'Health Care': '52.04%',
          Utilities: '41.18%',
          Industrials: '40.12%',
          'Consumer Staples': '31.97%',
          Materials: '15.79%',
          'Communication Services': '5.94%',
          Energy: '-34.26%',
        },
        'Rank J: 10 Year Performance': {
          'Consumer Discretionary': '461.42%',
          'Information Technology': '409.33%',
          'Health Care': '262.58%',
          Industrials: '258.60%',
          Financials: '212.80%',
          'Consumer Staples': '158.62%',
          Materials: '148.31%',
          Utilities: '126.03%',
          'Communication Services': '73.48%',
          Energy: '36.67%',
        },
      };
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.SECTOR,
      );

      expect(res).toEqual({
        description: 'US Sector Performance (realtime & historical)',
        lastRefreshed: '10:37 AM ET 07/12/2019',
        realTimePerformance: {
          communicationServices: '-0.02%',
          consumerDiscretionary: '0.74%',
          consumerStaples: '0.19%',
          energy: '0.62%',
          financials: '0.06%',
          healthCare: '-0.97%',
          industrials: '1.13%',
          informationTechnology: '0.27%',
          materials: '0.79%',
          realEstate: '-0.44%',
          utilities: '-0.79%',
        },
        oneDayPerformance: {
          communicationServices: '-0.09%',
          consumerDiscretionary: '0.16%',
          consumerStaples: '0.25%',
          energy: '0.18%',
          financials: '0.60%',
          healthCare: '0.02%',
          industrials: '0.71%',
          informationTechnology: '0.34%',
          materials: '0.43%',
          realEstate: '-1.21%',
          utilities: '0.04%',
        },
        fiveDaysPerformance: {
          communicationServices: '0.74%',
          consumerDiscretionary: '1.19%',
          consumerStaples: '0.07%',
          energy: '1.89%',
          financials: '0.23%',
          healthCare: '-0.98%',
          industrials: '-1.05%',
          informationTechnology: '0.53%',
          materials: '-2.34%',
          realEstate: '-0.37%',
          utilities: '0.36%',
        },
        oneMonthPerformance: {
          communicationServices: '6.87%',
          consumerDiscretionary: '5.66%',
          consumerStaples: '2.42%',
          energy: '5.31%',
          financials: '3.20%',
          healthCare: '2.71%',
          industrials: '1.96%',
          informationTechnology: '4.94%',
          materials: '0.73%',
          realEstate: '1.58%',
          utilities: '2.96%',
        },
        threeMonthsPerformance: {
          communicationServices: '4.34%',
          consumerDiscretionary: '4.89%',
          consumerStaples: '6.29%',
          energy: '-4.69%',
          financials: '6.25%',
          healthCare: '1.88%',
          industrials: '1.85%',
          informationTechnology: '5.47%',
          materials: '0.85%',
          realEstate: '3.39%',
          utilities: '5.92%',
        },
        oneYearPerformance: {
          communicationServices: '12.45%',
          consumerDiscretionary: '9.57%',
          consumerStaples: '13.51%',
          energy: '-16.95%',
          financials: '3.52%',
          healthCare: '7.55%',
          industrials: '4.75%',
          informationTechnology: '12.17%',
          materials: '-2.74%',
          realEstate: '14.36%',
          utilities: '17.32%',
        },
        yearToDatePerformance: {
          communicationServices: '22.25%',
          consumerDiscretionary: '24.82%',
          consumerStaples: '17.62%',
          energy: '12.04%',
          financials: '17.99%',
          healthCare: '8.10%',
          industrials: '19.69%',
          informationTechnology: '29.86%',
          materials: '14.44%',
          realEstate: '21.61%',
          utilities: '15.23%',
        },
        threeYearsPerformance: {
          communicationServices: '-6.68%',
          consumerDiscretionary: '52.38%',
          consumerStaples: '7.47%',
          energy: '-6.66%',
          financials: '51.13%',
          healthCare: '27.20%',
          industrials: '30.34%',
          informationTechnology: '94.58%',
          materials: '23.13%',
          realEstate: undefined,
          utilities: '15.99%',
        },
        fiveYearsPerformance: {
          communicationServices: '5.94%',
          consumerDiscretionary: '83.09%',
          consumerStaples: '31.97%',
          energy: '-34.26%',
          financials: '53.00%',
          healthCare: '52.04%',
          industrials: '40.12%',
          informationTechnology: '121.73%',
          materials: '15.79%',
          realEstate: undefined,
          utilities: '41.18%',
        },
        tenYearsPerformance: {
          communicationServices: '73.48%',
          consumerDiscretionary: '461.42%',
          consumerStaples: '158.62%',
          energy: '36.67%',
          financials: '212.80%',
          healthCare: '262.58%',
          industrials: '258.60%',
          informationTechnology: '409.33%',
          materials: '148.31%',
          realEstate: undefined,
          utilities: '126.03%',
        },
      });
    });
  });

  describe('## GLOBAL_QUOTE', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Global Quote': {
          '01. symbol': 'MSFT',
          '02. open': '138.8500',
          '03. high': '139.1300',
          '04. low': '138.0100',
          '05. price': '138.9000',
          '06. volume': '17725458',
          '07. latest trading day': '2019-07-12',
          '08. previous close': '138.4000',
          '09. change': '0.5000',
          '10. change percent': '0.3613%',
        },
      };
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.GLOBAL_QUOTE,
      );

      expect(res).toEqual({
        change: '0.5000',
        changePercent: '0.3613%',
        high: '139.1300',
        latestTradingDay: '2019-07-12',
        low: '138.0100',
        open: '138.8500',
        previousClose: '138.4000',
        price: '138.9000',
        symbol: 'MSFT',
        volume: '17725458',
      });
    });
  });

  describe('## TIME_SERIES_INTRADAY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information':
            'Intraday (5min) open, high, low, close prices and volume',
          '2. Symbol': 'MSFT',
          '3. Last Refreshed': '2019-07-12 16:00:00',
          '4. Interval': '5min',
          '5. Output Size': 'Compact',
          '6. Time Zone': 'US/Eastern',
        },
        'Time Series (5min)': {
          '2019-07-12 16:00:00': {
            '1. open': '138.6800',
            '2. high': '138.9800',
            '3. low': '138.6800',
            '4. close': '138.8900',
            '5. volume': '1736475',
          },
        },
      };
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.TIME_SERIES_INTRADAY,
      );

      expect(res).toEqual({
        description: 'Intraday (5min) open, high, low, close prices and volume',
        symbol: 'MSFT',
        interval: '5min',
        lastRefreshed: '2019-07-12 16:00:00',
        timeZone: 'US/Eastern',
        outputType: 'Compact',
        timeSeries: {
          '2019-07-12 16:00:00': {
            close: '138.8900',
            high: '138.9800',
            low: '138.6800',
            open: '138.6800',
            volume: '1736475',
          },
        },
      });
    });
  });

  describe('## TIME_SERIES_DAILY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
          '2. Symbol': 'MSFT',
          '3. Last Refreshed': '2019-07-12',
          '4. Output Size': 'Compact',
          '5. Time Zone': 'US/Eastern',
        },
        'Time Series (Daily)': {
          '2019-07-12': {
            '1. open': '138.8500',
            '2. high': '139.1300',
            '3. low': '138.0099',
            '4. close': '138.9000',
            '5. volume': '18936832',
          },
        },
      };
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.TIME_SERIES_DAILY,
      );

      expect(res).toEqual({
        description: 'Daily Prices (open, high, low, close) and Volumes',
        symbol: 'MSFT',
        lastRefreshed: '2019-07-12',
        timeZone: 'US/Eastern',
        outputType: 'Compact',
        timeSeries: {
          '2019-07-12': {
            close: '138.9000',
            high: '139.1300',
            low: '138.0099',
            open: '138.8500',
            volume: '18936832',
          },
        },
      });
    });
  });

  describe('## TIME_SERIES_WEEKLY', () => {
    it('should transform the response into the expected format', async () => {
      const response = {
        'Meta Data': {
          '1. Information':
            'Weekly Prices (open, high, low, close) and Volumes',
          '2. Symbol': 'MSFT',
          '3. Last Refreshed': '2019-07-12',
          '4. Time Zone': 'US/Eastern',
        },
        'Weekly Time Series': {
          '2019-07-12': {
            '1. open': '136.4000',
            '2. high': '139.2200',
            '3. low': '135.3701',
            '4. close': '138.9000',
            '5. volume': '102149446',
          },
        },
      };
      const res = await responseTransformer(
        {
          parse: 'transform',
        },
        response,
        constants.TIME_SERIES_WEEKLY,
      );

      expect(res).toEqual({
        description: 'Weekly Prices (open, high, low, close) and Volumes',
        symbol: 'MSFT',
        lastRefreshed: '2019-07-12',
        timeZone: 'US/Eastern',
        timeSeries: {
          '2019-07-12': {
            open: '136.4000',
            high: '139.2200',
            low: '135.3701',
            close: '138.9000',
            volume: '102149446',
          },
        },
      });
    });
  });
});
