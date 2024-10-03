import {
  AskRequest,
  AskResponse,
  ConfigureChatRequest,
  CreateOrUpdateFeedbackRequest,
} from '../types';
import { ClientBase } from './clientBase';

export class ChatClient extends ClientBase {
  private conversationId?: string = undefined;
  private history: [string, string][] = [];

  ask = (data: AskRequest) =>
    this.post<AskResponse>('/docs/ask', {
      data: {
        conversation_id: this.conversationId || undefined,
        history_messages: this.history.length > 0 ? this.history : undefined,
        ...data,
      },
    }).then((response) => {
      this.conversationId = response.data.conversation_id;
      this.history.push([data.question, response.data.answer]);
      return response;
    });

  resetConversation = () => {
    this.conversationId = '';
    this.history = [];
  };

  createOrUpdateFeedBack = (data: CreateOrUpdateFeedbackRequest) =>
    this.post('/feedback/create_or_update', { data });

  configureChat = (data: ConfigureChatRequest) =>
    this.post('/docs/configure_chat', { data });
}
