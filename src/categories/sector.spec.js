import sector from './sector';
import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

jest.mock('../utils/requestCreator');

describe('# exchangeRate', () => {
  let config;

  beforeEach(() => {
    requestCreator.mockReturnValue(Promise.resolve('an-output'));
    config = {
      url: 'a-mocked-url',
    };
  });

  it('it should call the exchange function correctly', async () => {
    const fn = sector(config);
    const result = await fn();

    expect(result).toEqual('an-output');
    expect(requestCreator).toHaveBeenCalledWith(config, {
      function: constants.SECTOR,
    });
  });
});
