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
    expect(responseTransformer).toHaveBeenCalledWith(
      { url: 'url?' },
      'a-response',
      'a-function',
    );
    expect(request).toHaveBeenCalledWith('url?function=a-function', {
      json: true,
    });
  });

  it('it should create the request and NOT call the transformer in case the dataType is not json', async () => {
    request.mockReturnValue(Promise.resolve('a-response-output'));
    responseTransformer.mockReturnValue('an-output');
    const result = await requestCreator(
      { url: 'url?' },
      { function: 'a-function', datatype: 'something-not-json' },
    );

    expect(result).toEqual('a-response-output');
    expect(responseTransformer).not.toHaveBeenCalledWith();
    expect(request).toHaveBeenCalledWith(
      'url?function=a-function&datatype=something-not-json',
      {
        json: false,
      },
    );
  });

  it('it should throw an exception and not call the transformer', async () => {
    request.mockReturnValue(Promise.reject(Error('an-error')));
    responseTransformer.mockReturnValue('an-output');

    await expect(
      requestCreator({ url: 'url?' }, { function: 'a-function' }),
    ).rejects.toEqual(
      new Error(`Error performing the request for function 'a-function'`),
    );

    expect(request).toHaveBeenCalledWith('url?function=a-function', {
      json: true,
    });
    expect(responseTransformer).not.toHaveBeenCalled();
  });
});
