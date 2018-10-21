import * as configuration from './index';
import parser from './parser';

describe('# parser', () => {
  it('should parse the config using the default configuration', () => {
    const input = {
      apiKey: 'an-API-Key',
    };
    const config = parser(input);

    expect(config).toEqual({
      baseUrl: configuration.BASE_URL,
      ...input,
    });
  });

  it('should parse the config using a custom configuration', () => {
    const input = {
      apiKey: 'an-API-Key',
      baseUrl: 'a-base-url',
    };
    const config = parser(input);

    expect(config).toEqual({
      ...input,
    });
  });

  it.each([null, undefined, ''])(
    'should throw an exception if apiKey is %s',
    key => {
      const input = {
        apiKey: key,
      };
      expect(() => parser(input)).toThrowError('apiKey is a required field');
    },
  );

  it.each([null, undefined, 'not-an-object'])(
    'should throw an exception if config is %s',
    input => {
      expect(() => parser(input)).toThrowError(
        'config is required and has to be an object',
      );
    },
  );
});
