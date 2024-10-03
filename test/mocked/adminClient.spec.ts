import { AdminClient } from '../../src';

describe('AdminClient', () => {
  let adminClient: AdminClient;
  let mockPost: jest.SpyInstance;

  beforeEach(() => {
    adminClient = new AdminClient('account_id', 'api_key');

    mockPost = jest
      .spyOn(adminClient as any, 'post')
      .mockResolvedValue({ data: {} });
  });

  test('should list connectors', async () => {
    await adminClient.listConnectors();
    expect(mockPost).toHaveBeenCalledWith('/connectors/list');
  });

  test('should list collections', async () => {
    const data = {
      namespace_name: 'public',
    };

    await adminClient.listCollections(data);

    expect(mockPost).toHaveBeenCalledWith('/collections/list', { data });
  });
});
