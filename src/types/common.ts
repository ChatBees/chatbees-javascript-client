export interface PostPayLoad {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  file?: File;
}

export interface ClientConfig {
  accountId: string;
  apiKey?: string;
  collectionBaseInfo: CollectionBaseRequest;
}

export interface CollectionBaseRequest {
  namespace_name: string;
  collection_name: string;
}

export type BareRequest<T extends CollectionBaseRequest> = Omit<
  T,
  keyof CollectionBaseRequest
>;

export enum IngestionType {
  CONFLUENCE = 'CONFLUENCE',
  GDRIVE = 'GDRIVE',
  NOTION = 'NOTION',
}

export interface Reference {
  doc_name: string;
  page_num: number;
  sample_text: string;
}
