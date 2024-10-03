import { ListCollectionsRequest, ListConnectorsResponse } from '../types';
import { ClientBase } from './clientBase';

export class AdminClient extends ClientBase {
  listConnectors = () => this.post<ListConnectorsResponse>('/connectors/list');

  listCollections = (data: ListCollectionsRequest) =>
    this.post('/collections/list', { data });
}
