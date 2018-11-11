import replacer from './replace';

describe('# replace', () => {
  it('should replace the value correctly', () => {
    const string = 'a-string-a';
    const context = {
      from: 'a',
      to: 'b',
    };
    const result = replacer(string, context);

    expect(result).toEqual('b-string-b');
  });

  it.each([null, undefined, ''])(
    'should throw an exception if the value is %s',
    key => {
      expect(() => replacer(key)).toThrow(
        `The provided value is not valid: ${key}`,
      );
    },
  );

  it.each([null, undefined, ''])(
    'should throw an exception if the context is %s',
    key => {
      expect(() => replacer('good-value', key)).toThrow(`context is required`);
    },
  );

  it.each([null, undefined, ''])(
    'should throw an exception if the context.from is %s',
    key => {
      const context = {
        from: key,
        to: 'to',
      };
      expect(() => replacer('good-value', context)).toThrow(
        `context.from is required`,
      );
    },
  );

  it.each([null, undefined, ''])(
    'should throw an exception if the context.to is %s',
    key => {
      const context = {
        from: 'from',
        to: key,
      };
      expect(() => replacer('good-value', context)).toThrow(
        `context.to is required`,
      );
    },
  );
});
