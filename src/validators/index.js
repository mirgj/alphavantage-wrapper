import digitalCurrencies from './digitalCurrencies';
import physicalCurrencies from './physicalCurrencies';
import dataType from './dataType';
import outputSize from './outputSize';
import interval from './interval';

export default (value, type) => {
  switch (type) {
    case 'digitalPhysicalCurrency':
      if (!digitalCurrencies(value) && !physicalCurrencies(value)) {
        throw new Error(`Currency '${value}' was not expected`);
      }

      return true;
    case 'digitalCurrency':
      if (!digitalCurrencies(value)) {
        throw new Error(`Digital currency '${value}' was not expected`);
      }

      return true;
    case 'physicalCurrency':
      if (!physicalCurrencies(value)) {
        throw new Error(`Physical currency '${value}' was not expected`);
      }

      return true;
    case 'dataType':
      if (!dataType(value)) {
        throw new Error(`Data type '${value}' was not expected`);
      }

      return true;
    case 'outputSize':
      if (!outputSize(value)) {
        throw new Error(`Output size '${value}' was not expected`);
      }

      return true;
    case 'interval':
      if (!interval(value)) {
        throw new Error(`Interval '${value}' was not expected`);
      }

      return true;
    default:
      throw new Error(`Validator for ${type} is not defined`);
  }
};
