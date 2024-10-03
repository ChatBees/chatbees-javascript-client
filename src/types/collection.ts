import { CollectionBaseRequest, IngestionType, Reference } from './common';

export interface CreateCollectionRequest extends CollectionBaseRequest {
  description?: string;
  public_read?: boolean;
}

export interface DeleteDocRequest extends CollectionBaseRequest {
  doc_name: string;
}

export enum DocumentType {
  FILE = 'FILE',
  WEBSITE = 'WEBSITE',
  NOTION = 'NOTION',
  GDRIVE = 'GDRIVE',
  CONFLUENCE = 'CONFLUENCE',
}

export interface DocumentMetadata {
  name: string;
  url?: string;
  type: DocumentType;
}

export interface ListDocsResponse {
  documents: DocumentMetadata[];
  doc_names: string[];
}

export interface SummaryRequest extends CollectionBaseRequest {
  doc_name: string;
}

export interface SummaryResponse {
  summary: string;
}

export interface ExtractRelevantTextsRequest extends CollectionBaseRequest {
  // find the texts relevant to the input texts in the doc
  doc_name: string;
  input_texts: string;
}

export interface ExtractRelevantTextsResponse {
  relevant_texts: string;
}

export interface OutlineFAQRequest extends CollectionBaseRequest {
  doc_name: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface OutlineFAQResponse {
  outlines: string[];
  faqs: FAQ[];
}

export interface TranscribeAudioRequest extends CollectionBaseRequest {
  lang: string;
  url?: string;
  access_token?: string;
}

export interface TranscribeAudioResponse {
  transcript: string;
}

export interface SearchRequest extends CollectionBaseRequest {
  question: string;
  top_k?: number;
}

export type SearchReference = Reference;

export interface SearchResponse {
  refs: SearchReference[];
}

export interface ScheduleSpec {
  cron_expr: string;
  timezone: string;
}

export interface CreateCrawlRequest extends CollectionBaseRequest {
  root_url: string;
  max_urls_to_crawl: number;
  schedule?: ScheduleSpec;
}

export interface CreateCrawlResponse {
  crawl_id: string;
}

export interface GetCrawlRequest extends CollectionBaseRequest {
  crawl_id: string;
}

export enum IngestionStatus {
  RUNNING = 1,
  SUCCEEDED = 2,
  FAILED = 3,
}

export type CrawlStatus = IngestionStatus;

export interface PageStats {
  char_count: number;
  error_code?: string;
  error_msg?: string;
}

export interface GetCrawlResponse {
  root_url: string;
  created_on: number;
  max_pages: number;
  crawl_status: CrawlStatus;
  crawl_result?: { [key: string]: PageStats };
}

export interface IndexCrawlRequest extends CollectionBaseRequest {
  crawl_id: string;
}

export interface DeleteCrawlRequest extends CollectionBaseRequest {
  root_url: string;
}

export interface IngestionSpec {
  token?: string;
  schedule?: ScheduleSpec;
}

export interface ConfluenceSpec extends IngestionSpec {
  url: string;
  username?: string;
  space?: string;
  cql?: string;
}

export interface GDriveSpec extends IngestionSpec {
  folder_name?: string;
}

export interface NotionSpec extends IngestionSpec {
  token?: string;
  page_ids?: string[];
  database_ids?: string[];
}

export interface CreateIngestionRequest extends CollectionBaseRequest {
  connector_id: string;
  type: IngestionType;
  spec: ConfluenceSpec | GDriveSpec | NotionSpec;
}

export interface CreateIngestionResponse {
  ingestion_id: string;
}

export interface UpdatePeriodicIngestionRequest extends CollectionBaseRequest {
  type: IngestionType;
  spec: ConfluenceSpec | GDriveSpec | NotionSpec;
}

export interface GetIngestionRequest extends CollectionBaseRequest {
  ingestion_id: string;
}

export interface GetIngestionResponse {
  ingestion_status: IngestionStatus;
}

export interface IndexIngestionRequest extends CollectionBaseRequest {
  ingestion_id: string;
}

export interface DeleteIngestionRequest extends CollectionBaseRequest {
  type: IngestionType;
}

export interface DeletePeriodicIngestionRequest extends CollectionBaseRequest {
  type: IngestionType;
}
