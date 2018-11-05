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
      convert: false,
      injectRawResponse: false,
      parse: 'transform',
      validate: false,
      ...input,
    });
  });

  it('should parse the config using a custom configuration', () => {
    const input = {
      apiKey: 'an-API-Key',
      baseUrl: 'a-base-url',
      convert: true,
      injectRawResponse: true,
      parse: 'clean',
      validate: true,
    };
    const config = parser(input);

    expect(config).toEqual({
      ...input,
    });
  });

  it.each(['clean', 'transform', 'none'])(
    'should NOT throw an exception if parse is of an expected value',
    ley => {
      const input = {
        apiKey: 'key',
        parse: ley,
      };
      expect(() => parser(input)).not.toThrowError(
        'parse contains an unexpected value',
      );
    },
  );

  it('should throw an exception if parse is of an unexpected value', () => {
    const input = {
      apiKey: 'key',
      parse: 'not-a-valid-value',
    };
    expect(() => parser(input)).toThrowError(
      'parse contains an unexpected value',
    );
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
