import request from 'request-promise';
import responseTransformer from './responseTransformer';
import requestCreator from './requestCreator';

jest.mock('request-promise');
jest.mock('./responseTransformer');

describe('# requestCreator', () => {
  afterEach(() => {
    request.mockClear();
    responseTransformer.mockClear();
  });

  it('it should create the request and call the transformer correctly', async () => {
    request.mockReturnValue(Promise.resolve('a-response'));
    responseTransformer.mockReturnValue('an-output');
    const result = await requestCreator({ a: 'config' }, 'url', 'a-function');

    expect(result).toEqual('an-output');
    expect(responseTransformer).toBeCalledWith(
      { a: 'config' },
      'a-response',
      'a-function',
    );
    expect(request).toBeCalledWith('url', { json: true });
  });

  it('it should throw an exception and not call the transformer', async () => {
    request.mockReturnValue(Promise.reject(Error('an-error')));
    responseTransformer.mockReturnValue('an-output');

    await expect(
      requestCreator({ a: 'config' }, 'url', 'a-function'),
    ).rejects.toEqual(
      new Error(`Error performing the request for function 'a-function'`),
    );

    expect(request).toBeCalledWith('url', { json: true });
    expect(responseTransformer).not.toBeCalled();
  });
});
