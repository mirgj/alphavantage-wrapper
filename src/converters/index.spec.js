import loadConverter from '.';
import replace from './replace';

jest.mock('./replace');

describe('# converters', () => {
  beforeEach(() => {
    replace.mockReturnValue('replaced');
  });

  afterEach(() => {
    replace.mockClear();
  });

  it('should load the right converter', () => {
    const result = loadConverter('a-value', {
      type: 'replace',
      context: { a: 'context' },
    });

    expect(result).toEqual('replaced');
    expect(replace).toHaveBeenCalledWith('a-value', { a: 'context' });
  });

  it('should throw an exception if converter is not supported', () => {
    const converter = {
      type: 'unknown-converter',
      context: { a: 'context' },
    };

    expect(() => loadConverter('value', converter)).toThrow(
      `Converter '${converter.type}' is not supported`,
    );
  });

  it.each([null, undefined, ''])(
    'should throw an exception if converter is %s',
    key => {
      expect(() => loadConverter('value', key)).toThrow(
        'converter cannot be null',
      );
    },
  );

  it.each([null, undefined, ''])(
    'should throw an exception if converter.type is %s',
    key => {
      const context = {
        type: key,
      };
      expect(() => loadConverter('value', context)).toThrow(
        'converter.type is required',
      );
    },
  );

  it.each([null, undefined, ''])(
    'should throw an exception if converter.context is %s',
    key => {
      const context = {
        type: 'key',
        context: key,
      };
      expect(() => loadConverter('value', context)).toThrow(
        'converter.context is required',
      );
    },
  );
});
