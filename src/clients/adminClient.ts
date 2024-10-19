import { ListCollectionsRequest, ListConnectorsResponse } from '../types';
import { ClientBase } from './clientBase';

/**
 * Client for interacting with the admin API.
 */
export class AdminClient extends ClientBase {
  /**
   * Lists all connectors.
   * @returns A promise that resolves to the API response containing the list of connectors.
   */
  listConnectors = () => this.post<ListConnectorsResponse>('/connectors/list');

  /**
   * Lists all collections.
   * @param data - The request data containing collection listing parameters.
   * @returns A promise that resolves to the API response containing the list of collections.
   */
  listCollections = (data: ListCollectionsRequest) =>
    this.post('/collections/list', { data });
}
