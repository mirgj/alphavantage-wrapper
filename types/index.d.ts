interface IConfig {
  apiKey: string;
  baseUrl: string;
  injectRawResponse: boolean;
}

interface ICurrency {
  code: string;
  name: string;
}

interface IExchangeRateResult {
  from: ICurrency;
  to: ICurrency;
  exchangeRate: string | number;
  lastRefresh: string | Date;
  timeZone: string;
}

interface ICrypto {}
interface IForex {}

interface IResult {
  crypto: ICrypto;
  forex: IForex;
  exchangeRate(from_currency: string, to_currency: string): IExchangeRateResult;
}

export function init(config: IConfig): IResult;
