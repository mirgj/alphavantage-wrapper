declare enum ParseType {
  NONE = 'none',
  TRANSFORM = 'transform',
  CLEAN = 'clean',
}

declare enum IntervalType {
  ONE_MIN = '1min',
  FIVE_MIN = '5min',
  FIFTEEN_MIN = '15min',
  THIRTY_MIN = '30min',
  SIXTY_MIN = '60min',
}

declare enum OutputSizeType {
  COMPACT = 'compact',
  FULL = 'full',
}

declare enum DataTypeType {
  JSON = 'json',
  CSV = 'csv',
}

interface IConfig {
  apiKey: string;
  baseUrl: string;
  injectRawResponse: boolean;
  convert: boolean;
  validate: boolean;
  parse: ParseType;
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

interface IStockMarketValue extends IMarketValue, IVolume {}

interface IAdjustedStockMarketValue extends IMarketValue, IVolume {
  adjustedClose: string | number;
  dividendAmount: string | number;
  splitCoefficient: string | number;
}

interface ICyptoMarketValue extends IMarketValue, IVolume {
  marketCap: string | number;
}

interface ICryptoTimeType {
  [key: string]: ICyptoMarketValue;
}

interface IVolume {
  volume: string | number;
}

interface ICyptoTimeSeries {
  [key: string]: ICryptoTimeType;
}

interface IForexTimeSeries {
  [key: string]: IMarketValue;
}

interface IStockTimeSeries {
  [key: string]: IStockMarketValue;
}

interface IAdjustedStockTimeSeries {
  [key: string]: IAdjustedStockMarketValue;
}

interface IExchangeRateResult {
  from: ICurrency;
  to: ICurrency;
  exchangeRate: string | number;
  lastRefreshed: string | Date;
  timeZone: string;
}

interface ICryptoResult {
  description: string;
  currency: ICurrency;
  exchange: ICurrency;
  lastRefreshed: string | Date;
  timeZone: string;
  timeSeries: ICyptoTimeSeries;
}

interface IForexResult {
  description: string;
  from: ICurrency;
  to: ICurrency;
  outputType: OutputSizeType;
  lastRefreshed: string | Date;
  timeZone: string;
  timeSeries: IForexTimeSeries;
}

interface IBaseStockResult {
  description: string;
  symbol: string;
  interval: IntervalType;
  outputType: OutputSizeType;
  lastRefreshed: string | Date;
  timeZone: string;
}

interface IStockResult extends IBaseStockResult {
  timeSeries: IStockTimeSeries;
}

interface IAdjustedStockResult extends IBaseStockResult {
  timeSeries: IAdjustedStockTimeSeries;
}

interface ISectorPerformance {
  communicationServices: string | number;
  consumerDiscretionary: string | number;
  consumerStaples: string | number;
  energy: string | number;
  financials: string | number;
  healthCare: string | number;
  industrials: string | number;
  informationTechnology: string | number;
  materials: string | number;
  realEstate: string | number;
  utilities: string | number;
}

interface ISectorResult {
  description: string;
  lastRefreshed: string | Date;
  realTimePerformance: ISectorPerformance;
  oneDayPerformance: ISectorPerformance;
  fiveDaysPerformance: ISectorPerformance;
  oneMonthPerformance: ISectorPerformance;
  threeMonthsPerformance: ISectorPerformance;
  yearToDatePerformance: ISectorPerformance;
  oneYearPerformance: ISectorPerformance;
  threeYearsPerformance: ISectorPerformance;
  fiveYearsPerformance: ISectorPerformance;
  tenYearsPerformance: ISectorPerformance;
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
    interval?: IntervalType,
    outputSize?: OutputSizeType,
    dataType?: DataTypeType,
  ): IForexResult;
  daily(
    from_currency: string,
    to_currency: string,
    outputSize?: OutputSizeType,
    dataType?: DataTypeType,
  ): IForexResult;
  weekly(
    from_currency: string,
    to_currency: string,
    dataType?: DataTypeType,
  ): IForexResult;
  monthly(
    from_currency: string,
    to_currency: string,
    dataType?: DataTypeType,
  ): IForexResult;
}

interface IStockQuoteResult {
  change: string | number;
  changePercent: string | number;
  high: string | number;
  latestTradingDay: string | Date;
  low: string | number;
  open: string | number;
  previousClose: string | number;
  price: string | number;
  symbol: string;
  volume: string | number;
}

interface IStock {
  intraday(
    symbol: string,
    interval?: IntervalType,
    outputSize?: OutputSizeType,
    dataType?: DataTypeType,
  ): IStockResult;
  daily(
    symbol: string,
    outputSize?: OutputSizeType,
    dataType?: DataTypeType,
  ): IStockResult;
  daily_adjusted(
    symbol: string,
    outputSize?: OutputSizeType,
    dataType?: DataTypeType,
  ): IAdjustedStockResult;
  weekly(symbol: string, dataType?: DataTypeType): IStockResult;
  weekly_adjusted(
    symbol: string,
    dataType?: DataTypeType,
  ): IAdjustedStockResult;
  monthly(symbol: string, dataType?: DataTypeType): IStockResult;
  quote(symbol: string, dataType?: DataTypeType): IStockQuoteResult;
}

interface IUtils {
  cleaner(obj: object): object;
}

interface IResult {
  crypto: ICrypto;
  forex: IForex;
  stock: IStock;
  utils: IUtils;
  exchangeRate(from_currency: string, to_currency: string): IExchangeRateResult;
  sectors(): ISectorResult;
}

declare function init(config: IConfig): IResult;

export = init;
