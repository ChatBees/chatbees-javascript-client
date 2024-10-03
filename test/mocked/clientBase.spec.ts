import axios from 'axios';
import { ClientBase, PostPayLoad } from '../../src';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ClientBase', () => {
  let clientBase: ClientBase;
  const response = { data: 'response' };

  beforeEach(() => {
    clientBase = new ClientBase('account_id', 'api_key');
    mockedAxios.post.mockClear();
  });

  test('should post data without api_key in headers', () => {
    clientBase = new ClientBase('account_id');
    expect(clientBase['headers']).toEqual({});
  });

  test('should post data without file', async () => {
    const data: PostPayLoad = { data: { key: 'value' } };
    mockedAxios.post.mockResolvedValue(response);

    const result = await clientBase['post']('/test/path', data);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://account_id.us-west-2.aws.chatbees.ai/test/path',
      data.data,
      { headers: { 'api-key': 'api_key' } }
    );
    expect(result).toEqual(response);
  });

  test('should post data with file', async () => {
    const data = {
      data: { key: 'value' },
      file: new File(['content'], 'test.txt', { type: 'text/plain' }),
    };
    mockedAxios.post.mockResolvedValue(response);

    const result = await clientBase['post']('/test/path', data);

    const formData = new FormData();
    formData.append('request', JSON.stringify(data.data));
    formData.append('file', data.file);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://account_id.us-west-2.aws.chatbees.ai/test/path',
      formData,
      {
        headers: {
          'api-key': 'api_key',
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    expect(result).toEqual(response);
  });
});
