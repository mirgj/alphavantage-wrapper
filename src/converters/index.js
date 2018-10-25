import replace from './replace';

export default (value, converter) => {
  if (!converter) throw new Error(`'converter cannot be null`);
  if (!converter.type) throw new Error(`'converter.type is required`);
  if (!converter.context) throw new Error(`'converter.context is required`);

  switch (converter.type) {
    case 'replace':
      return replace(value, converter.context);
    default:
      throw new Error(`Converter '${converter.type}' is not supported`);
  }
};
