import {
  AskRequest,
  AskResponse,
  ConfigureChatRequest,
  CreateOrUpdateFeedbackRequest,
} from '../types';
import { ClientBase } from './clientBase';

export class ChatClient extends ClientBase {
  history: (AskResponse & {
    question: string;
  })[] = [];
  conversationId?: string = undefined;

  ask = (data: AskRequest) =>
    this.post<AskResponse>('/docs/ask', {
      data: {
        conversation_id: this.conversationId || undefined,
        history_messages:
          this.history.length > 0
            ? this.history.reduce(
                (acc, cur) => [
                  ...acc,
                  [cur.question, cur.answer] as [string, string],
                ],
                [] as [string, string][]
              )
            : undefined,
        ...data,
      },
    }).then((response) => {
      this.conversationId = response.data.conversation_id;
      this.history.push({
        ...response.data,
        question: data.question,
      });
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
