import axios, { AxiosResponse } from 'axios';
import { configDotenv } from 'dotenv';
import { PostPayLoad } from '../types';

configDotenv();

const ENV_TEST_BASE_URL = process.env.ENV_TEST_BASE_URL || '';

export class ClientBase {
  private readonly baseUrl: string;

  constructor(
    private accountId: string,
    protected apiKey?: string
  ) {
    if (ENV_TEST_BASE_URL === 'preprod') {
      this.baseUrl = `https://${this.accountId}.preprod.aws.chatbees.ai`;
    }
    if (ENV_TEST_BASE_URL.includes('localhost')) {
      this.baseUrl = ENV_TEST_BASE_URL;
    } else {
      this.baseUrl = `https://${this.accountId}.us-west-2.aws.chatbees.ai`;
    }
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
