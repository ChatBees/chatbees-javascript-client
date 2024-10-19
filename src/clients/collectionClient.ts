import {
  CollectionBaseRequest,
  CreateCollectionRequest,
  CreateCrawlRequest,
  CreateCrawlResponse,
  CreateIngestionRequest,
  CreateIngestionResponse,
  DeleteCrawlRequest,
  DeleteDocRequest,
  DeleteIngestionRequest,
  DeletePeriodicIngestionRequest,
  ExtractRelevantTextsRequest,
  ExtractRelevantTextsResponse,
  GetCrawlRequest,
  GetCrawlResponse,
  GetIngestionRequest,
  GetIngestionResponse,
  IndexCrawlRequest,
  IndexIngestionRequest,
  ListDocsResponse,
  OutlineFAQRequest,
  OutlineFAQResponse,
  SearchRequest,
  SearchResponse,
  SummaryRequest,
  SummaryResponse,
  TranscribeAudioRequest,
  TranscribeAudioResponse,
  UpdatePeriodicIngestionRequest,
} from '../types';
import { ClientBase } from './clientBase';

/**
 * Client for interacting with the collection API.
 */
export class CollectionClient extends ClientBase {
  /**
   * Creates a new collection.
   * @param data - The request data for creating a collection.
   * @returns A promise that resolves to the API response.
   */
  createCollection = (data: CreateCollectionRequest) =>
    this.post('/collections/create', { data });

  /**
   * Configures an existing collection.
   * @param data - The request data for configuring a collection.
   * @returns A promise that resolves to the API response.
   */
  configureCollection = (data: CreateCollectionRequest) =>
    this.post('/collections/configure', { data });

  /**
   * Deletes a collection.
   * @param data - The request data for deleting a collection.
   * @returns A promise that resolves to the API response.
   */
  deleteCollection = (data: CollectionBaseRequest) =>
    this.post('/collections/delete', { data });

  /**
   * Uploads a document to a collection.
   * @param data - The request data for uploading a document.
   * @param file - The file to be uploaded.
   * @returns A promise that resolves to the API response.
   */
  uploadDocument = (data: CollectionBaseRequest, file: File) =>
    this.post('/docs/add', {
      data,
      file,
    });

  /**
   * Deletes a document from a collection.
   * @param data - The request data for deleting a document.
   * @returns A promise that resolves to the API response.
   */
  deleteDocument = (data: DeleteDocRequest) =>
    this.post('/docs/delete', { data });

  /**
   * Lists all documents in a collection.
   * @param data - The request data for listing documents.
   * @returns A promise that resolves to the API response containing the list of documents.
   */
  listDocuments = (data: CollectionBaseRequest) =>
    this.post<ListDocsResponse>('/docs/list', { data });

  /**
   * Summarizes a document in a collection.
   * @param data - The request data for summarizing a document.
   * @returns A promise that resolves to the API response containing the summary.
   */
  summarizeDocument = (data: SummaryRequest) =>
    this.post<SummaryResponse>('/docs/summary', { data });

  /**
   * Extracts relevant texts from a document in a collection.
   * @param data - The request data for extracting relevant texts.
   * @returns A promise that resolves to the API response containing the extracted texts.
   */
  extractRelevantTexts = (data: ExtractRelevantTextsRequest) =>
    this.post<ExtractRelevantTextsResponse>('/docs/extract_relevant_texts', {
      data,
    });

  /**
   * Gets the outline FAQ of a document in a collection.
   * @param data - The request data for getting the outline FAQ.
   * @returns A promise that resolves to the API response containing the outline FAQ.
   */
  getDocumentOutlineFaq = (data: OutlineFAQRequest) =>
    this.post<OutlineFAQResponse>('/docs/get_outline_faq', { data });

  /**
   * Transcribes audio to text.
   * @param data - The request data for transcribing audio.
   * @param file - The audio file to be transcribed.
   * @returns A promise that resolves to the API response containing the transcription.
   */
  transcribeAudio = (data: TranscribeAudioRequest, file: File) =>
    this.post<TranscribeAudioResponse>('/docs/transcribe_audio', {
      data,
      file,
    });

  /**
   * Searches documents in a collection.
   * @param data - The request data for searching documents.
   * @returns A promise that resolves to the API response containing the search results.
   */
  search = (data: SearchRequest) =>
    this.post<SearchResponse>('/docs/search', { data });

  /**
   * Creates a new crawl.
   * @param data - The request data for creating a crawl.
   * @returns A promise that resolves to the API response containing the crawl details.
   */
  createCrawl = (data: CreateCrawlRequest) =>
    this.post<CreateCrawlResponse>('/docs/create_crawl', { data });

  /**
   * Gets the details of a crawl.
   * @param data - The request data for getting crawl details.
   * @returns A promise that resolves to the API response containing the crawl details.
   */
  getCrawl = (data: GetCrawlRequest) =>
    this.post<GetCrawlResponse>('/docs/get_crawl', { data });

  /**
   * Indexes a crawl.
   * @param data - The request data for indexing a crawl.
   * @returns A promise that resolves to the API response.
   */
  indexCrawl = (data: IndexCrawlRequest) =>
    this.post('/docs/index_crawl', { data });

  /**
   * Deletes a crawl.
   * @param data - The request data for deleting a crawl.
   * @returns A promise that resolves to the API response.
   */
  deleteCrawl = (data: DeleteCrawlRequest) =>
    this.post('/docs/delete_crawl', { data });

  /**
   * Creates a new ingestion.
   * @param data - The request data for creating an ingestion.
   * @returns A promise that resolves to the API response containing the ingestion details.
   */
  createIngestion = (data: CreateIngestionRequest) =>
    this.post<CreateIngestionResponse>('/docs/create_ingestion', { data });

  /**
   * Updates periodic ingestion settings.
   * @param data - The request data for updating periodic ingestion.
   * @returns A promise that resolves to the API response.
   */
  updatePeriodicIngestion = (data: UpdatePeriodicIngestionRequest) =>
    this.post('/docs/update_periodic_ingestion', { data });

  /**
   * Gets the details of an ingestion.
   * @param data - The request data for getting ingestion details.
   * @returns A promise that resolves to the API response containing the ingestion details.
   */
  getIngestion = (data: GetIngestionRequest) =>
    this.post<GetIngestionResponse>('/docs/get_ingestion', { data });

  /**
   * Indexes an ingestion.
   * @param data - The request data for indexing an ingestion.
   * @returns A promise that resolves to the API response.
   */
  indexIngestion = (data: IndexIngestionRequest) =>
    this.post('/docs/index_ingestion', { data });

  /**
   * Deletes an ingestion.
   * @param data - The request data for deleting an ingestion.
   * @returns A promise that resolves to the API response.
   */
  deleteIngestion = (data: DeleteIngestionRequest) =>
    this.post('/docs/delete_ingestion', { data });

  /**
   * Deletes periodic ingestion settings.
   * @param data - The request data for deleting periodic ingestion.
   * @returns A promise that resolves to the API response.
   */
  deletePeriodicIngestion = (data: DeletePeriodicIngestionRequest) =>
    this.post('/docs/delete_periodic_ingestion', { data });
}
