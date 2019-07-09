import querystring from 'querystring';
import rp from 'request-promise-native';
import responseTransformer from './responseTransformer';

export default async (config, query) => {
  try {
    const json = !query.datatype || query.datatype === 'json';
    const appendQuery = querystring.stringify(query);
    const url = `${config.url}${appendQuery}`;

    const result = await rp(url, { json });

    if (json) {
      return responseTransformer(config, result, query.function);
    }

    return result;
  } catch (err) {
    throw new Error(
      `Error performing the request for function '${query.function}'`,
    );
  }
};
