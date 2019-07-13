import lib from '.';

describe('# index', () => {
  it('should create the object correctly', () => {
    const res = lib({
      apiKey: 'a-api',
    });
    expect(res.crypto).toEqual({
      daily: expect.any(Function),
      weekly: expect.any(Function),
      monthly: expect.any(Function),
    });
    expect(res.stock).toEqual({
      quote: expect.any(Function),
      // search: expect.any(Function),
    });
    expect(res.forex).toEqual({
      intraday: expect.any(Function),
      daily: expect.any(Function),
      weekly: expect.any(Function),
      monthly: expect.any(Function),
    });
    expect(res.exchangeRate).toEqual(expect.any(Function));
    expect(res.sectors).toEqual(expect.any(Function));
    expect(res.utils).toEqual({
      cleaner: expect.any(Function),
    });
  });
});
