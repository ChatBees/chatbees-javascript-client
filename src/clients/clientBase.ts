import axios, { AxiosResponse } from 'axios';
import { PostPayLoad } from '../types';

export class ClientBase {
  private readonly baseUrl: string;

  constructor(
    private accountId: string,
    protected apiKey?: string
  ) {
    this.baseUrl = `https://${this.accountId}.us-west-2.aws.chatbees.ai`;
  }

  private get headers(): Record<string, string> {
    return this.apiKey ? { 'api-key': this.apiKey } : {};
  }

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
