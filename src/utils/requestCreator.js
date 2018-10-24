import rp from 'request-promise';
import responseTransformer from './responseTransformer';

export default async (config, url, functionType) => {
  try {
    const result = await rp(url, { json: true });

    return responseTransformer(config, result, functionType);
  } catch (err) {
    throw new Error(
      `Error performing the request for function '${functionType}'`,
    );
  }
};
