import parser from './config/parser';
import crypto from './categories/crypto';
import forex from './categories/forex';
import exchangeRate from './categories/exchangeRate';

export default config => {
  const parsedConfig = parser(config);
  parsedConfig.url = `${parsedConfig.baseUrl}?apikey=${parsedConfig.apiKey}&`;

  return {
    crypto: crypto(parsedConfig),
    forex: forex(parsedConfig),
    exchangeRate: exchangeRate(parsedConfig),
  };
};
