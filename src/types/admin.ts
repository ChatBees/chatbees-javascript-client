import { IngestionType } from './common';

export interface ConnectorReference {
  id: string;
  type: IngestionType;
  name: string;
}

export interface ListConnectorsResponse {
  connectors: ConnectorReference[];
}

export interface ListCollectionsRequest {
  namespace_name: string;
}
