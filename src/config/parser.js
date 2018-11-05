import * as configuration from './index';

export default config => {
  if (!config || typeof config !== 'object')
    throw new Error('config is required and has to be an object');
  if (!config.apiKey) throw new Error('apiKey is a required field');
  if (
    config.parse &&
    ![
      configuration.TRANSFORM,
      configuration.CLEAN,
      configuration.NONE,
    ].includes(config.parse)
  )
    throw new Error('parse contains an unexpected value');

  const {
    baseUrl = configuration.BASE_URL,
    injectRawResponse = false,
    convert = false,
    validate = false,
    parse = configuration.TRANSFORM,
  } = config || {};

  return {
    baseUrl,
    injectRawResponse,
    convert,
    parse,
    validate,
    ...config,
  };
};
