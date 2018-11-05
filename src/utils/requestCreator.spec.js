import request from 'request-promise-native';
import responseTransformer from './responseTransformer';
import requestCreator from './requestCreator';

jest.mock('request-promise-native');
jest.mock('./responseTransformer');

describe('# requestCreator', () => {
  afterEach(() => {
    request.mockClear();
    responseTransformer.mockClear();
  });

  it('it should create the request and call the transformer correctly', async () => {
    request.mockReturnValue(Promise.resolve('a-response'));
    responseTransformer.mockReturnValue('an-output');
    const result = await requestCreator(
      { url: 'url?' },
      { function: 'a-function' },
    );

    expect(result).toEqual('an-output');
    expect(responseTransformer).toBeCalledWith(
      { url: 'url?' },
      'a-response',
      'a-function',
    );
    expect(request).toBeCalledWith('url?function=a-function', {
      json: true,
    });
  });

  it('it should throw an exception and not call the transformer', async () => {
    request.mockReturnValue(Promise.reject(Error('an-error')));
    responseTransformer.mockReturnValue('an-output');

    await expect(
      requestCreator({ url: 'url?' }, { function: 'a-function' }),
    ).rejects.toEqual(
      new Error(`Error performing the request for function 'a-function'`),
    );

    expect(request).toBeCalledWith('url?function=a-function', { json: true });
    expect(responseTransformer).not.toBeCalled();
  });
});