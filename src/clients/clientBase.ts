import axios, { AxiosResponse } from 'axios';
import { PostPayLoad } from '../types';

/**
 * Base class for API clients, providing common functionality for making HTTP requests.
 */
export class ClientBase extends EventTarget {
  private readonly baseUrl: string;

  /**
   * Creates an instance of ClientBase.
   * @param accountId - The account ID used to construct the base URL.
   * @param apiKey - Optional API key for authentication.
   */
  constructor(
    protected accountId: string,
    protected apiKey?: string
  ) {
    super();
    this.baseUrl = `https://${this.accountId}.us-west-2.aws.chatbees.ai`;
  }

  /**
   * Gets the headers for the HTTP request.
   * @returns An object containing the headers.
   */
  private get headers(): Record<string, string> {
    return this.apiKey ? { 'api-key': this.apiKey } : {};
  }

  /**
   * Makes a POST request to the specified path.
   * @param path - The API endpoint path.
   * @param payload - The payload containing data and optional file.
   * @returns A promise that resolves to the Axios response.
   */
  protected async post<T extends object = object>(
    path: string,
    { data = {}, file }: PostPayLoad = {}
  ): Promise<AxiosResponse<T>> {
    const url = `${this.baseUrl}${path}`;
    const headers = this.headers;
    let payload = data;

    if (file) {
      const formData = new FormData();
      if (data) {
        formData.append('request', JSON.stringify(data));
      }
      formData.append('file', file);

      payload = formData;
      headers['Content-Type'] = 'multipart/form-data';
    }

    return await axios.post(url, payload, { headers });
  }
}
