import parser from './config/parser';
import crypto from './categories/crypto';

export default config => {
  const parsedConfig = parser(config);

  return {
    crypto: crypto(parsedConfig),
  };
};
