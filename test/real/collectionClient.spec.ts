import { configDotenv } from 'dotenv';
import fs from 'fs';
import path from 'path';
import {
  CollectionBaseRequest,
  CollectionClient,
  DeleteDocRequest,
  IngestionType,
  SummaryRequest,
} from '../../src';

configDotenv();

describe('CollectionClient', () => {
  let collectionClient: CollectionClient;

  beforeEach(() => {
    collectionClient = new CollectionClient(
      process.env.ACCOUNT_ID!,
      process.env.API_KEY
    );
  });

  test('should create a collection', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: 'new_collection',
      description: 'chatbees collection',
      public_read: true,
    };

    const response = await collectionClient.createCollection(data);
    expect(response).toBeTruthy();
  }, 20000);

  test('should configure a collection', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: 'new_collection',
      description: 'old collection',
      public_read: false,
    };

    const response = await collectionClient.configureCollection(data);
    expect(response).toBeTruthy();
  });

  test('should delete a collection', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: 'new_collection',
    };

    const response = await collectionClient.deleteCollection(data);
    expect(response).toBeTruthy();
  });

  test('should upload a document', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
    };
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    const response = await collectionClient.uploadDocument(data, file);
    expect(response).toBeTruthy();
  });

  test('should delete a document', async () => {
    const data: DeleteDocRequest = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      doc_name: 'test.txt',
    };

    const response = await collectionClient.deleteDocument(data);
    expect(response).toBeTruthy();
  });

  test('should list documents', async () => {
    const data: CollectionBaseRequest = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
    };

    const response = await collectionClient.listDocuments(data);
    expect(response).toBeTruthy();
  }, 20000);

  test('should summarize a document', async () => {
    const data: SummaryRequest = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      doc_name: 'test.txt',
    };

    const response = await collectionClient.summarizeDocument(data);
    expect(response).toBeTruthy();
  });

  // 500?
  test('should extract relevant texts', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      doc_name: 'test.txt',
      input_texts: 'content',
    };

    const response = await collectionClient.extractRelevantTexts(data);
    expect(response).toBeTruthy();
  });

  test('should get document outline FAQ', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      doc_name: '重构改善既有代码的设计第2版.pdf',
    };

    const response = await collectionClient.getDocumentOutlineFaq(data);
    expect(response).toBeTruthy();
  }, 200000);

  // 401?
  test('should transcribe audio', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      lang: 'en',
    };
    const filePath = path.join(__dirname, 'U9-1.mp3');
    const fileContent = fs.readFileSync(filePath);
    const file = new File([fileContent], 'U9-1.mp3', { type: 'audio/mpeg' });

    const response = await collectionClient.transcribeAudio(data, file);
    expect(response).toBeTruthy();
  }, 200000);

  test('should search', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      question: 'test',
    };

    const response = await collectionClient.search(data);
    expect(response).toBeTruthy();
  }, 20000);

  test('should create crawl', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      root_url: 'https://example.com',
      max_urls_to_crawl: 200,
    };

    const response = await collectionClient.createCrawl(data);
    expect(response).toBeTruthy();
  });

  test('should get crawl status', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      crawl_id: '1QBLKTK40MJCSUD85BN19YZ4T8',
    };

    const response = await collectionClient.getCrawl(data);
    expect(response).toBeTruthy();
  });

  test('should index crawl', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      crawl_id: '1QBLKTK40MJCSUD85BN19YZ4T8',
    };

    const response = await collectionClient.indexCrawl(data);
    expect(response).toBeTruthy();
  });

  test('should delete crawl', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      root_url: 'https://example.org',
    };

    const response = await collectionClient.deleteCrawl(data);
    expect(response).toBeTruthy();
  });

  test('should create ingestion', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      connector_id: 'notion_d47e06c2-1ab9-44d4-a571-7ac7a323abe3',
      type: IngestionType.NOTION,
      spec: {
        database_ids: ['0d6a719b-f396-4e33-a6df-2cb33667008c'],
      },
    };

    const response = await collectionClient.createIngestion(data);
    expect(response).toBeTruthy();
  });

  test('should update periodic ingestion', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      type: IngestionType.GDRIVE,
      spec: {},
    };

    const response = await collectionClient.updatePeriodicIngestion(data);
    expect(response).toBeTruthy();
  });

  test('should get ingestion status', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      ingestion_id: '0JQY55HPNB4P07CRXW4U6JTY0Y',
    };

    const response = await collectionClient.getIngestion(data);
    expect(response).toBeTruthy();
  });

  test('should index ingestion', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      ingestion_id: '0JQY55HPNB4P07CRXW4U6JTY0Y',
    };

    const response = await collectionClient.indexIngestion(data);
    expect(response).toBeTruthy();
  });

  test('should delete ingestion', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      type: IngestionType.NOTION,
    };

    const response = await collectionClient.deleteIngestion(data);
    expect(response).toBeTruthy();
  });

  test('should delete periodic ingestion', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      type: IngestionType.CONFLUENCE,
    };

    const response = await collectionClient.deletePeriodicIngestion(data);
    expect(response).toBeTruthy();
  });
});
