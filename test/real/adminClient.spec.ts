import { configDotenv } from 'dotenv';
import { AdminClient } from '../../src';

configDotenv();

describe('AdminClient', () => {
  let adminClient: AdminClient;

  beforeEach(() => {
    adminClient = new AdminClient(process.env.ACCOUNT_ID!, process.env.API_KEY);
  });

  test('should list connectors', async () => {
    const response = await adminClient.listConnectors();
    expect(response).toBeTruthy();
  });

  test('should list collections', async () => {
    const data = {
      namespace_name: 'public',
    };

    const response = await adminClient.listCollections(data);
    expect(response).toBeTruthy();
  });
});
