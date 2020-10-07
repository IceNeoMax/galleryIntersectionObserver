import { getImages } from '../services/api';

test('test API with key ok', async () => {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    limit: 8,
    offset: 0,
    q: 'cat',
    rating: 'G',
    lang: 'en',
  };

  expect.assertions(1);
  return getImages(params).then(data => {
    expect(data.data).not.toBe(undefined);
  });
});
