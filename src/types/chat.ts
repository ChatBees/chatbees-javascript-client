import { CollectionBaseRequest, Reference } from './common';

export interface AskRequest extends CollectionBaseRequest {
  question: string;
  top_k?: number;
  doc_name?: string;
  history_messages?: [string, string][];
  conversation_id?: string;
}

export type AnswerReference = Reference;

export interface AskResponse {
  answer: string;
  refs: AnswerReference[];
  request_id: string;
  conversation_id: string;
}

enum FeedbackSource {
  WEBSITE = 'WEBSITE',
}

interface UnregisteredUser {
  source: FeedbackSource;
  email?: string;
  name?: string;
}

export interface CreateOrUpdateFeedbackRequest extends CollectionBaseRequest {
  request_id: string;
  thumb_down?: boolean;
  text_feedback?: string;
  unregistered_user?: UnregisteredUser;
}

export interface ChatAttributes {
  persona?: string;
  negative_response?: string;
}

export interface ConfigureChatRequest extends CollectionBaseRequest {
  chat_attributes: ChatAttributes;
}
