import querystring from 'querystring';
import forex from './forex';
import requestCreator from '../utils/requestCreator';
// import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');
jest.mock('querystring');

describe('# forex', () => {
  let config;
  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    querystring.stringify.mockReturnValue('a-query');
    config = {
      url: 'a-mocked-url',
    };
  });

  afterEach(() => {
    requestCreator.mockClear();
    querystring.stringify.mockClear();
  });

  it('should create the object correctly', () => {
    const fn = forex(config);

    expect(fn.intraday).toEqual(expect.any(Function));
    expect(fn.daily).toEqual(expect.any(Function));
    expect(fn.weekly).toEqual(expect.any(Function));
    expect(fn.monthly).toEqual(expect.any(Function));
  });
});
