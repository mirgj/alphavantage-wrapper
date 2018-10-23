import * as transformers from './responseTransformer';

describe('', () => {
  it('', () => {
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

    console.log(transformers.exchangeRate(response));
  });
});
