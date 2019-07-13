# alpha-vantage-wrapper

This small library wraps around the [Alpha Vantage APIs](https://www.alphavantage.co/) with an easy and cleaner interface. The following documentation is related to the wrapper with recalls to the [official documentation](https://www.alphavantage.co/documentation/).

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
- `stock: object`: Provides a set of functions for the stock market
- `sectors: function`: Provides the sectors statistics
- `utils: object`: Provides some utils to be used anytime
- (TODO: more to add)

Follow the documentation to know more about the single functionalities

## exchangeRate

The `exchangeRate` is used to get the exchange rate from currency A to currency B. Crypto currencies are also supported. The following example shows the conversion rate from BTC (bitcoin) to USD.

Example:

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

While in case `parse` mode is set to `none` the output will be the same as the API:

```js
{
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
```

The last two parse mode are the same for all the other APIs and will not be explained in the next examples as they're mostly related on how **alphavantage** provides the output.

In any case, if `injectRawResponse` is set to `true`, the original output will be replicated inside a property `raw` in the output. Example:

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

## crypto

This module provide functions related to the **crypto currencies**. The following function are exposed through the module:

- `daily`: returns daily rates of the give crypto currency
- `weekly`: returns weekly rates of the give crypto currency
- `monthly`: returns monthly rates of the give crypto currency

Each of the method listed above will have the same signature which is the following: `[methodName](symbol: string, market: string)` where `symbol` is the crypto currency code (eg. BTC) and `market` is the referred market to use as refernce for the convertion (eg. USD)

Example:

```js
import alphavantagewrapper from 'alphavantage-wrapper';

const q = alphavantagewrapper({
  apiKey: '<your API key>',
});

const output = await q.crypto.daily('BTC', 'USD');
```

The output of the example will be the following (with `parse` mode set to `transform`):

```js
{
   "description":"Daily Prices and Volumes for Digital Currency",
   "currency":{
      "code":"BTC",
      "name":"Bitcoin"
   },
   "exchange":{
      "code":"USD",
      "name":"United States Dollar"
   },
   "lastRefreshed":"2019-07-08 23:59:59",
   "timeZone":"UTC",
   "timeSeries":{
      "2019-07-08":{
         "USD":{
            "open":"11481.98207885",
            "high":"12373.74881946",
            "low":"11367.45957574",
            "close":"12311.24952666",
            "marketCap":"933835349.19382334"
         },
         "volume":"75852.19901291"
      }
      // repeted multiple time with all the give days
   }
}
```

`weekly` and `monthly` will be the same but _timeSeries_ will be aggregated based on the week/month.

## forex

This module provide functions related to the **forex** market. The following function are exposed through the module:

- `intraday(from_currency: string, to_currency: string, interval?: IntervalType, outputSize?: OutputSizeType, dataType?: DataTypeType)`: provides intraday rates for the given currencies
- `daily(from_currency: string, to_currency: string, outputSize?: OutputSizeType, dataType?: DataTypeType)`: provides daily rates for the given currencies
- `weekly(from_currency: string, to_currency: string, dataType?: DataTypeType)`: provides weekly rates for the given currencies
- `monthly(from_currency: string, to_currency: string, dataType?: DataTypeType)`: provides monthly rates for the given currencies

These are the relative parameters with the specific meaning (defined also in the service docs):

- `from_currency`: Currency symbol value (eg: USD)
- `to_currency`: Currency symbol value (eg: EUR)
- `interval`: Time interval between two consecutive data points in the time series. The following values are supported: `1min`, `5min`, `15min`, `30min`, `60min` (default: **5min**)
- `outputSize`: Accepts `compact` or `full` and will affect the number of output; compact will returns only the last 100 data points (default: **compact**)
- `dataType`: Accepts `json` or `csv` and will affect the output of the API call (default: **json**)

Example:

```js
import alphavantagewrapper from 'alphavantage-wrapper';

const q = alphavantagewrapper({
  apiKey: '<your API key>',
});

const output = await q.forex.intraday('USD', 'EUR');
```

The output of the example will be the following (with `parse` mode set to `transform`):

```js
{
   "description":"FX Intraday (5min) Time Series",
   "from":{
      "code":"USD"
   },
   "to":{
      "code":"EUR"
   },
   "lastRefreshed":"2019-07-09 14:55:00",
   "timeZone":"UTC",
   "interval":"5min",
   "outputType":"Compact",
   "timeSeries":{
      "2019-07-09 14:55:00":{
         "open":"0.8924",
         "high":"0.8924",
         "low":"0.8920",
         "close":"0.8920"
      },
      // many others based on the interval value
   }
}
```

`daily`, `weekly` and `monthly` will be the same but the _timeSeries_ will be aggregated based on the day/week/month.

These methods supports also csv output based on the signature defined above. In that case the wrapper will return you the string as the service without any sort of manipulation. Feel free to use libraries like _CSVTOJSON_ or similar to handle the csv.

Example

```js
const output = await q.forex.monthly('USD', 'EUR', 'csv');
```

the output will be a string with the following:

```csv
timestamp,open,high,low,close
2019-07-10,0.8794,0.8930,0.8792,0.8887
2019-06-30,0.8953,0.8967,0.8761,0.8794
```

## stock

This module provide functions related to the **stock** market. The following function are exposed through the module:

- `quote(symbol: string, dataType?: DataTypeType)`: provides the quote rates for the given symbol/ticker
- (more to add)

These are the relative parameters with the specific meaning (defined also in the service docs):

- `symbol`: Stock symbol value (eg: MSFT)
- `dataType`: Accepts `json` or `csv` and will affect the output of the API call (default: **json**)

### quote

Example:

```js
import alphavantagewrapper from 'alphavantage-wrapper';

const q = alphavantagewrapper({
  apiKey: '<your API key>',
});

const output = await q.stock.quote('MSFT');
```

The output of the example will be the following (with `parse` mode set to `transform`):

```js
{
   "symbol":"MSFT",
   "change":"0.5000",
   "changePercent":"0.3613%",
   "high":"139.1300",
   "latestTradingDay":"2019-07-12",
   "low":"138.0100",
   "open":"138.8500",
   "previousClose":"138.4000",
   "price":"138.9000",
   "volume":"17725458"
}
```

## sectors

The `sectors` will be used to get the statistics about the sectors and their performance over the time as per API spec.

```js
import alphavantagewrapper from 'alphavantage-wrapper';

const q = alphavantagewrapper({
  apiKey: '<your API key>',
});

const output = await q.sectors();
```

The output of the example will be the following (with `parse` mode set to `transform`):

```js
{
   "description":"US Sector Performance (realtime & historical)",
   "lastRefreshed":"10:37 AM ET 07/12/2019",
   "realTimePerformance":{
      "communicationServices":"-0.02%",
      "consumerDiscretionary":"0.74%",
      "consumerStaples":"0.19%",
      "energy":"0.62%",
      "financials":"0.06%",
      "healthCare":"-0.97%",
      "industrials":"1.13%",
      "informationTechnology":"0.27%",
      "materials":"0.79%",
      "realEstate":"-0.44%",
      "utilities":"-0.79%"
   },
   "oneDayPerformance":{
      "communicationServices":"-0.09%",
      "consumerDiscretionary":"0.16%",
      "consumerStaples":"0.25%",
      "energy":"0.18%",
      "financials":"0.60%",
      "healthCare":"0.02%",
      "industrials":"0.71%",
      "informationTechnology":"0.34%",
      "materials":"0.43%",
      "realEstate":"-1.21%",
      "utilities":"0.04%"
   },
   "fiveDaysPerformance":{
      "communicationServices":"0.74%",
      "consumerDiscretionary":"1.19%",
      "consumerStaples":"0.07%",
      "energy":"1.89%",
      "financials":"0.23%",
      "healthCare":"-0.98%",
      "industrials":"-1.05%",
      "informationTechnology":"0.53%",
      "materials":"-2.34%",
      "realEstate":"-0.37%",
      "utilities":"0.36%"
   },
   "oneMonthPerformance":{
      "communicationServices":"6.87%",
      "consumerDiscretionary":"5.66%",
      "consumerStaples":"2.42%",
      "energy":"5.31%",
      "financials":"3.20%",
      "healthCare":"2.71%",
      "industrials":"1.96%",
      "informationTechnology":"4.94%",
      "materials":"0.73%",
      "realEstate":"1.58%",
      "utilities":"2.96%"
   },
   "threeMonthsPerformance":{
      "communicationServices":"4.34%",
      "consumerDiscretionary":"4.89%",
      "consumerStaples":"6.29%",
      "energy":"-4.69%",
      "financials":"6.25%",
      "healthCare":"1.88%",
      "industrials":"1.85%",
      "informationTechnology":"5.47%",
      "materials":"0.85%",
      "realEstate":"3.39%",
      "utilities":"5.92%"
   },
   "oneYearPerformance":{
      "communicationServices":"12.45%",
      "consumerDiscretionary":"9.57%",
      "consumerStaples":"13.51%",
      "energy":"-16.95%",
      "financials":"3.52%",
      "healthCare":"7.55%",
      "industrials":"4.75%",
      "informationTechnology":"12.17%",
      "materials":"-2.74%",
      "realEstate":"14.36%",
      "utilities":"17.32%"
   },
   "yearToDatePerformance":{
      "communicationServices":"22.25%",
      "consumerDiscretionary":"24.82%",
      "consumerStaples":"17.62%",
      "energy":"12.04%",
      "financials":"17.99%",
      "healthCare":"8.10%",
      "industrials":"19.69%",
      "informationTechnology":"29.86%",
      "materials":"14.44%",
      "realEstate":"21.61%",
      "utilities":"15.23%"
   },
   "threeYearsPerformance":{
      "communicationServices":"-6.68%",
      "consumerDiscretionary":"52.38%",
      "consumerStaples":"7.47%",
      "energy":"-6.66%",
      "financials":"51.13%",
      "healthCare":"27.20%",
      "industrials":"30.34%",
      "informationTechnology":"94.58%",
      "materials":"23.13%",
      "utilities":"15.99%"
   },
   "fiveYearsPerformance":{
      "communicationServices":"5.94%",
      "consumerDiscretionary":"83.09%",
      "consumerStaples":"31.97%",
      "energy":"-34.26%",
      "financials":"53.00%",
      "healthCare":"52.04%",
      "industrials":"40.12%",
      "informationTechnology":"121.73%",
      "materials":"15.79%",
      "utilities":"41.18%"
   },
   "tenYearsPerformance":{
      "communicationServices":"73.48%",
      "consumerDiscretionary":"461.42%",
      "consumerStaples":"158.62%",
      "energy":"36.67%",
      "financials":"212.80%",
      "healthCare":"262.58%",
      "industrials":"258.60%",
      "informationTechnology":"409.33%",
      "materials":"148.31%",
      "utilities":"126.03%"
   }
}
```

## utils

This module provides utilities functions that can be used based at any time. The following function are exposed through the module:

- `cleaner`: a small utility function that will remove the space or non standard chars from your json keys, convert it to a friendly object key and give it back. It's used internally in case of parse mode set to `clean`. It can be used again in case you'd like to use the library without parse mode set to none or in case you'd like to use it for any other functionality

### cleaner

Example

```js
console.log(
  q.utils.cleaner({
    'not nice key': 'value',
  }),
);
```

the output will be a string with the following:

```js
{
  notnicekey: 'value';
}
```
