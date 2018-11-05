interface IConfig {
  apiKey: string;
  baseUrl: string;
  injectRawResponse: boolean;
  convert: boolean;
  validate: boolean;
  parse: string;
}

interface ICurrency {
  code: string;
  name: string;
}

interface IMarketValue {
  open: string | number;
  high: string | number;
  low: string | number;
  close: string | number;
}

interface ICyptoMarketValue extends IMarketValue {
  marketCap: string | number;
}

interface ICryptoTimeType {
  [key: string]: ICyptoMarketValue;
  volume: string | number;
}

interface ICyptoTimeSeries {
  [key: string | Date]: ICryptoTimeType;
}

interface IForexTimeSeries {
  [key: string | Date]: IMarketValue;
}

interface IExchangeRateResult {
  from: ICurrency;
  to: ICurrency;
  exchangeRate: string | number;
  lastRefresh: string | Date;
  timeZone: string;
}

interface ICryptoResult {
  description: string;
  currency: ICurrency;
  exchange: ICurrency;
  lastRefresh: string | Date;
  timeZone: string;
  timeSeries: ICyptoTimeSeries;
}

interface IForexResult {
  description: string;
  from: ICurrency;
  to: ICurrency;
  outputType: string;
  lastRefresh: string | Date;
  timeZone: string;
  timeSeries: IForexTimeSeries;
}

interface ICrypto {
  daily(symbol: string, market: string): ICryptoResult;
  weekly(symbol: string, market: string): ICryptoResult;
  monthly(symbol: string, market: string): ICryptoResult;
}
interface IForex {
  intraday(
    from_currency: string,
    to_currency: string,
    interval?: string,
    outputSize?: string,
    dataType?: string,
  ): IForexResult;
  daily(
    from_currency: string,
    to_currency: string,
    outputSize?: string,
    dataType?: string,
  ): IForexResult;
  weekly(
    from_currency: string,
    to_currency: string,
    dataType?: string,
  ): IForexResult;
  monthly(
    from_currency: string,
    to_currency: string,
    dataType?: string,
  ): IForexResult;
}

interface IResult {
  crypto: ICrypto;
  forex: IForex;
  exchangeRate(from_currency: string, to_currency: string): IExchangeRateResult;
}

export function init(config: IConfig): IResult;
