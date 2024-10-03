import {
  CollectionBaseRequest,
  CollectionClient,
  DeleteDocRequest,
  IngestionType,
  SummaryRequest,
} from '../../src';

describe('CollectionClient', () => {
  let collectionClient: CollectionClient;
  let mockPost: jest.SpyInstance;

  beforeEach(() => {
    collectionClient = new CollectionClient('account_id', 'api_key');

    mockPost = jest
      .spyOn(collectionClient as any, 'post')
      .mockResolvedValue({ data: {} });
  });

  test('should create a collection', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      description: 'chatbees collection',
      public_read: true,
    };

    await collectionClient.createCollection(data);
    expect(mockPost).toHaveBeenCalledWith('/collections/create', { data });
  });

  test('should configure a collection', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      description: 'chatbees collection',
      public_read: true,
    };

    await collectionClient.configureCollection(data);
    expect(mockPost).toHaveBeenCalledWith('/collections/configure', { data });
  });

  test('should delete a collection', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
    };

    await collectionClient.deleteCollection(data);
    expect(mockPost).toHaveBeenCalledWith('/collections/delete', { data });
  });

  test('should upload a document', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
    };
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    await collectionClient.uploadDocument(data, file);

    expect(mockPost).toHaveBeenCalledWith('/docs/add', {
      data,
      file,
    });
  });

  test('should delete a document', async () => {
    const data: DeleteDocRequest = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      doc_name: 'test.txt',
    };

    await collectionClient.deleteDocument(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/delete', { data });
  });

  test('should list documents', async () => {
    const data: CollectionBaseRequest = {
      namespace_name: 'public',
      collection_name: 'chatbees',
    };

    await collectionClient.listDocuments(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/list', {
      data,
    });
  });

  test('should summarize a document', async () => {
    const data: SummaryRequest = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      doc_name: 'test.txt',
    };

    await collectionClient.summarizeDocument(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/summary', { data });
  });

  test('should extract relevant texts', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      doc_name: 'test.txt',
      input_texts: 'input texts',
    };

    await collectionClient.extractRelevantTexts(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/extract_relevant_texts', {
      data,
    });
  });

  test('should get document outline FAQ', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      doc_name: 'test.txt',
    };

    await collectionClient.getDocumentOutlineFaq(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/get_outline_faq', { data });
  });

  test('should transcribe audio', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      lang: 'en',
    };
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });

    await collectionClient.transcribeAudio(data, file);

    expect(mockPost).toHaveBeenCalledWith('/docs/transcribe_audio', {
      data,
      file,
    });
  });

  test('should search', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      question: 'test',
    };

    await collectionClient.search(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/search', { data });
  });

  test('should create crawl', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      root_url: 'https://example.com',
      max_urls_to_crawl: 200,
    };

    await collectionClient.createCrawl(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/create_crawl', { data });
  });

  test('should get crawl status', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      crawl_id: 'crawl_id',
    };

    await collectionClient.getCrawl(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/get_crawl', { data });
  });

  test('should index crawl', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      crawl_id: 'crawl_id',
    };

    await collectionClient.indexCrawl(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/index_crawl', { data });
  });

  test('should delete crawl', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      root_url: 'https://example.com',
    };

    await collectionClient.deleteCrawl(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/delete_crawl', { data });
  });

  test('should create ingestion', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      connector_id: 'connector_id',
      type: IngestionType.CONFLUENCE,
      spec: {},
    };

    await collectionClient.createIngestion(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/create_ingestion', { data });
  });

  test('should update periodic ingestion', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      type: IngestionType.GDRIVE,
      spec: {},
    };

    await collectionClient.updatePeriodicIngestion(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/update_periodic_ingestion', {
      data,
    });
  });

  test('should get ingestion status', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      ingestion_id: 'ingestion_id',
    };

    await collectionClient.getIngestion(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/get_ingestion', { data });
  });

  test('should index ingestion', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      ingestion_id: 'ingestion_id',
    };

    await collectionClient.indexIngestion(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/index_ingestion', { data });
  });

  test('should delete ingestion', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      type: IngestionType.NOTION,
    };

    await collectionClient.deleteIngestion(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/delete_ingestion', { data });
  });

  test('should delete periodic ingestion', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      type: IngestionType.CONFLUENCE,
    };

    await collectionClient.deletePeriodicIngestion(data);

    expect(mockPost).toHaveBeenCalledWith('/docs/delete_periodic_ingestion', {
      data,
    });
  });
});
