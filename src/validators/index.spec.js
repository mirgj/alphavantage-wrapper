import validators from './index';

describe('# Validators', () => {
  describe('## digitalCurrency', () => {
    it('should validate a correct value', () => {
      const ex = validators('BTC', 'digitalCurrency');

      expect(ex).toEqual(true);
    });

    it('should throw an exception if not supported', () => {
      expect(() => validators('invalid-currency', 'digitalCurrency')).toThrow();
    });
  });

  describe('## physicalCurrency', () => {
    it('should validate a correct value', () => {
      const ex = validators('EUR', 'physicalCurrency');

      expect(ex).toEqual(true);
    });

    it('should throw an exception if not supported', () => {
      expect(() =>
        validators('invalid-currency', 'physicalCurrency'),
      ).toThrow();
    });
  });

  describe('## dataType', () => {
    it.each(['json', 'csv'])('should validate a correct value', key => {
      const ex = validators(key, 'dataType');

      expect(ex).toEqual(true);
    });

    it('should throw an exception if not supported', () => {
      expect(() => validators('invalid-data-type', 'dataType')).toThrow();
    });
  });

  describe('## outputSize', () => {
    it.each(['full', 'compact'])('should validate a correct value', key => {
      const ex = validators(key, 'outputSize');

      expect(ex).toEqual(true);
    });

    it('should throw an exception if not supported', () => {
      expect(() => validators('invalid-output-size', 'outputSize')).toThrow();
    });
  });

  describe('## interval', () => {
    it.each(['1min', '5min', '15min', '30min', '60min'])(
      'should validate a correct value',
      key => {
        const ex = validators(key, 'interval');

        expect(ex).toEqual(true);
      },
    );

    it('should throw an exception if not supported', () => {
      expect(() => validators('invalid-interval', 'interval')).toThrow();
    });
  });
});
