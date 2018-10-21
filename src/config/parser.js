import * as configuration from './index';

export default config => {
  if (!config || typeof config !== 'object')
    throw new Error('config is required and has to be an object');
  if (!config.apiKey) throw new Error('apiKey is a required field');

  const { baseUrl = configuration.BASE_URL } = config;

  return {
    baseUrl,
    ...config,
  };
};
