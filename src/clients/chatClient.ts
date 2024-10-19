import {
  AskRequest,
  AskResponse,
  ConfigureChatRequest,
  CreateOrUpdateFeedbackRequest,
} from '../types';
import { ClientBase } from './clientBase';

/**
 * Represents an element in the chat history.
 */
export interface ChatHistoryElement {
  question: string;
  response?: AskResponse;
}

/**
 * Client for interacting with the chat API.
 */
export class ChatClient extends ClientBase {
  history: ChatHistoryElement[] = [];
  conversationId?: string = undefined;

  /**
   * Sends a question to the chat API and updates the chat history.
   * @param data - The request data containing the question and other parameters.
   * @returns A promise that resolves to the API response.
   */
  ask = async (data: AskRequest) => {
    const history_messages =
      this.history.length > 0
        ? this.history.reduce(
            (acc, cur) => [
              ...acc,
              [cur.question, cur.response?.answer || ''] as [string, string],
            ],
            [] as [string, string][]
          )
        : undefined;

    const newHistoryElement: ChatHistoryElement = { question: data.question };
    this.history.push(newHistoryElement);
    this.dispatchEvent(new Event('historyChange'));

    const response = await this.post<AskResponse>('/docs/ask', {
      data: {
        conversation_id: this.conversationId || undefined,
        history_messages,
        ...data,
      },
    });

    this.conversationId = response.data.conversation_id;
    newHistoryElement.response = response.data;
    this.dispatchEvent(new Event('historyChange'));

    return response;
  };

  /**
   * Resets the current conversation and clears the chat history.
   */
  resetConversation = () => {
    this.conversationId = '';
    this.history = [];
  };

  /**
   * Creates or updates feedback for a chat interaction.
   * @param data - The request data containing feedback details.
   * @returns A promise that resolves to the API response.
   */
  createOrUpdateFeedBack = (data: CreateOrUpdateFeedbackRequest) =>
    this.post('/feedback/create_or_update', { data });

  /**
   * Configures chat settings.
   * @param data - The request data containing chat configuration details.
   * @returns A promise that resolves to the API response.
   */
  configureChat = (data: ConfigureChatRequest) =>
    this.post('/docs/configure_chat', { data });
}
