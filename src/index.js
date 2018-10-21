import parser from './config/parser';
import crypto from './categories/crypto';

export default config => {
  const parsedConfig = parser(config);
  parsedConfig.url = `${parsedConfig.baseUrl}?apikey=${parsedConfig.apiKey}&`;

  return {
    crypto: crypto(parsedConfig),
  };
};
