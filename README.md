# alphavantage-wrapper

This small library wraps around the [Alpha Vantage APIs](https://www.alphavantage.co/) with an easy and cleaner interface.

## Initialisation

```js
import alphavantagewrapper from 'alphavantage-wrapper';

const q = alphavantagewrapper({
  apiKey: '<your API key>',
});
```

The wrapper function will initialise with based on the provided configuration, the options available are the following:

- `apiKey: string` (required): The API key to use
- `baseUrl: string` (optional): The base URL to use to make the request (**default value**: `https://www.alphavantage.co/query` ideally will never change but is configurable)
- `injectRawResponse: boolean` (optional): To use in case the parse mode is set to `transform` or `clean` to inject the raw response from the service into the output inside a property defined as `raw` (**default value**: `false`)
- `convert: boolean` (optional): Define whether the user would like to convert the vales from the service in numbers rather than strings (**default value**: `false`)
- `validate: boolean` (optional): Define whether the user input should be validated (**default value**: `false`); eg. validate currencies input, duration etc; to set to false if you're sure the input provided are correct
- `parse: 'none'|'clean'|'transform'` (optional): Define the parse mode to be used handling the response from the APIs. `none` will keep the original output, `clean` will keep the original structure but clean the keys to be used easily. `transform` will change the structure/keys with a new one more friendly (**default value**: `'transform'`)

After the Initialisation you'll get the following object with these properties:

- `exchangeRate: function`: Provides the exchange rate from currency to currecy (or also crypto currency to FIAT or crypto to crypto)
- `crypto: object`: Provides a set of functions for the crypto market
- `forex: object`: Provides a set of functions for the forex market
- `utils: object`: Provides some utils to be used anytime
- (TODO: more to add)

Follow the documentation to know more about the single functionalities

## exchangeRate

`exchangeRate` to be used to get the exchange rate from currency A to currency B. Crypto currencies are also supported. The following example shows the conversion rate from BTC (bitcoin) to USD.

```js
import alphavantagewrapper from 'alphavantage-wrapper';

const q = alphavantagewrapper({
  apiKey: '<your API key>',
});

const output = await q.exchangeRate('BTC', 'USD');
```

The output of the example will be the following (with `parse` mode set to `transform`):

```js
{
   "from":{
      "code":"BTC",
      "name":"Bitcoin"
   },
   "to":{
      "code":"USD",
      "name":"United States Dollar"
   },
   "exchangeRate":"11884.15000000",
   "lastRefresh":"2019-07-08 15:28:15",
   "timeZone":"UTC"
}
```

if the `parse` mode is set to `clean` the output will be following:

```js
{
   "realtimeCurrencyExchangeRate":{
      "from_CurrencyCode":"BTC",
      "from_CurrencyName":"Bitcoin",
      "to_CurrencyCode":"USD",
      "to_CurrencyName":"United States Dollar",
      "exchangeRate":"11887.26000000",
      "lastRefreshed":"2019-07-08 15:32:33",
      "timeZone":"UTC"
   }
}
```

otherwhile, in case is `none` the original output provided from the API will be maintained. In any case, if `injectRawResponse` is set to `true`, the original output will be replicated inside a property `raw` in the output. Example:

```js
{
   "from":{
      "code":"BTC",
      "name":"Bitcoin"
   },
   "to":{
      "code":"USD",
      "name":"United States Dollar"
   },
   "exchangeRate":"11905.29000000",
   "lastRefresh":"2019-07-08 15:37:02",
   "timeZone":"UTC",
   "raw":{
      "Realtime Currency Exchange Rate":{
         "1. From_Currency Code":"BTC",
         "2. From_Currency Name":"Bitcoin",
         "3. To_Currency Code":"USD",
         "4. To_Currency Name":"United States Dollar",
         "5. Exchange Rate":"11905.29000000",
         "6. Last Refreshed":"2019-07-08 15:37:02",
         "7. Time Zone":"UTC"
      }
   }
}
```
