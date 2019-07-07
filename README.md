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
- `parse: 'none'|'clean'|'transform'` (optional): (**default value**: `'transform'`)

After the Initialisation you'll get the following object with these properties:

- `exchangeRate: function`: Provides the exchange rate from currency to currecy (or also crypto currency to FIAT or crypto to crypto)
- `crypto: object`: Provides a set of functions for the crypto market
- `forex: object`: Provides a set of functions for the forex market
- `utils: object`: Provides some utils to be used anytime
- (more to add)

Follow the documentation to know more about the single functionalities
