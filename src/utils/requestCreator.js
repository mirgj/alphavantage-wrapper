import querystring from 'querystring';
import rp from 'request-promise';
import responseTransformer from './responseTransformer';

export default async (config, query) => {
  try {
    const appendQuery = querystring.stringify(query);
    const url = `${config.url}${appendQuery}`;

    const result = await rp(url, { json: true });

    return responseTransformer(config, result, query.function);
  } catch (err) {
    throw new Error(
      `Error performing the request for function '${query.function}'`,
    );
  }
};
