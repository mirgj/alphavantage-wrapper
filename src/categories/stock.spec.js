import stock from './stock';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# stock', () => {
  let config;
  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    config = {
      url: 'a-mocked-url',
    };
  });

  afterEach(() => {
    requestCreator.mockClear();
  });

  it('should create the object correctly', () => {
    const fn = stock(config);

    expect(fn.quote).toEqual(expect.any(Function));
    // expect(fn.search).toEqual(expect.any(Function));
  });

  it('should call the quote function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.quote('MSFT');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.GLOBAL_QUOTE,
      symbol: 'MSFT',
      datatype: 'json',
    });
  });

  it('should call the quote function correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.quote('MSFT', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.GLOBAL_QUOTE,
      symbol: 'MSFT',
      datatype: 'csv',
    });
  });

  it.skip('should call the search function correctly with default parameters', async () => {
    const fn = stock(config);
    const result = await fn.search('Micro');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.SYMBOL_SEARCH,
      keywords: 'Micro',
      datatype: 'json',
    });
  });

  it.skip('should call the quote data correctly with custom parameters', async () => {
    const fn = stock(config);
    const result = await fn.search('Micro', 'csv');

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.SYMBOL_SEARCH,
      keywords: 'Micro',
      datatype: 'csv',
    });
  });
});
