import { clean } from './cleaner';

describe('# clean', () => {
  it('should clean the key of the given object from space, spacial chars etc', () => {
    const data = {
      'Meta Data': {
        '1. Information': 'Weekly Prices and Volumes for Digital Currency',
        '2. Digital Currency Code': 'BTC',
        '3. Digital Currency Name': 'Bitcoin',
        '4. Market Code': 'CNY',
        '5. Market Name': 'Chinese Yuan',
        '6. Last Refreshed': '2018-11-10 (end of day)',
        '7. Time Zone': 'UTC',
      },
      'Time Series (Digital Currency Weekly)': {
        '2018-11-10': {
          '1a. open (CNY)': '44464.78037790',
          '1b. open (USD)': '6452.71858344',
          '2a. high (CNY)': '45993.18343740',
          '2b. high (USD)': '6634.52533573',
          '3a. low (CNY)': '44461.56321960',
          '3b. low (USD)': '6417.01867365',
          '4a. close (CNY)': '44717.65364900',
          '4b. close (USD)': '6427.72080624',
          '5. volume': '11020.47852920',
          '6. market cap (USD)': '71624809.43820000',
        },
      },
    };

    const obj = clean(data);

    expect(obj).toEqual({
      metaData: {
        information: 'Weekly Prices and Volumes for Digital Currency',
        digitalCurrencyCode: 'BTC',
        digitalCurrencyName: 'Bitcoin',
        marketCode: 'CNY',
        marketName: 'Chinese Yuan',
        lastRefreshed: '2018-11-10 (end of day)',
        timeZone: 'UTC',
      },
      timeSeries: {
        '2018-11-10': {
          open_CNY: '44464.78037790',
          open_USD: '6452.71858344',
          high_CNY: '45993.18343740',
          high_USD: '6634.52533573',
          low_CNY: '44461.56321960',
          low_USD: '6417.01867365',
          close_CNY: '44717.65364900',
          close_USD: '6427.72080624',
          volume: '11020.47852920',
          marketcap_USD: '71624809.43820000',
        },
      },
    });
  });
});
