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

export class CollectionClient extends ClientBase {
  createCollection = (data: CreateCollectionRequest) =>
    this.post('/collections/create', { data });

  configureCollection = (data: CreateCollectionRequest) =>
    this.post('/collections/configure', { data });

  deleteCollection = (data: CollectionBaseRequest) =>
    this.post('/collections/delete', { data });

  uploadDocument = (data: CollectionBaseRequest, file: File) =>
    this.post('/docs/add', {
      data,
      file,
    });

  deleteDocument = (data: DeleteDocRequest) =>
    this.post('/docs/delete', { data });

  listDocuments = (data: CollectionBaseRequest) =>
    this.post<ListDocsResponse>('/docs/list', { data });

  summarizeDocument = (data: SummaryRequest) =>
    this.post<SummaryResponse>('/docs/summary', { data });

  extractRelevantTexts = (data: ExtractRelevantTextsRequest) =>
    this.post<ExtractRelevantTextsResponse>('/docs/extract_relevant_texts', {
      data,
    });

  getDocumentOutlineFaq = (data: OutlineFAQRequest) =>
    this.post<OutlineFAQResponse>('/docs/get_outline_faq', { data });

  transcribeAudio = (data: TranscribeAudioRequest, file: File) =>
    this.post<TranscribeAudioResponse>('/docs/transcribe_audio', {
      data,
      file,
    });

  search = (data: SearchRequest) =>
    this.post<SearchResponse>('/docs/search', { data });

  createCrawl = (data: CreateCrawlRequest) =>
    this.post<CreateCrawlResponse>('/docs/create_crawl', { data });

  getCrawl = (data: GetCrawlRequest) =>
    this.post<GetCrawlResponse>('/docs/get_crawl', { data });

  indexCrawl = (data: IndexCrawlRequest) =>
    this.post('/docs/index_crawl', { data });

  deleteCrawl = (data: DeleteCrawlRequest) =>
    this.post('/docs/delete_crawl', { data });

  createIngestion = (data: CreateIngestionRequest) =>
    this.post<CreateIngestionResponse>('/docs/create_ingestion', { data });

  updatePeriodicIngestion = (data: UpdatePeriodicIngestionRequest) =>
    this.post('/docs/update_periodic_ingestion', { data });

  getIngestion = (data: GetIngestionRequest) =>
    this.post<GetIngestionResponse>('/docs/get_ingestion', { data });

  indexIngestion = (data: IndexIngestionRequest) =>
    this.post('/docs/index_ingestion', { data });

  deleteIngestion = (data: DeleteIngestionRequest) =>
    this.post('/docs/delete_ingestion', { data });

  deletePeriodicIngestion = (data: DeletePeriodicIngestionRequest) =>
    this.post('/docs/delete_periodic_ingestion', { data });
}
