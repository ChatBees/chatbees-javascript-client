import { ChatClient } from '../../src';

describe('ChatClient', () => {
  let chatClient: ChatClient;
  let mockPost: jest.SpyInstance;

  beforeEach(() => {
    chatClient = new ChatClient('account_id');

    mockPost = jest
      .spyOn(chatClient as any, 'post')
      .mockResolvedValue({ data: {} });
  });

  test('should ask question', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      question: 'What is a valid question?',
    };

    await chatClient.ask(data);
    expect(mockPost).toHaveBeenCalledWith('/docs/ask', {
      data,
    });
  });

  test('should reset conversation', () => {
    chatClient.resetConversation();
    expect(chatClient.conversationId).toBe('');
    expect(chatClient.history).toEqual([]);
  });

  test('should create or update feedback', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      doc_name: 'test.txt',
      feedback: 'good',
      request_id: '123',
    };

    await chatClient.createOrUpdateFeedBack(data);
    expect(mockPost).toHaveBeenCalledWith('/feedback/create_or_update', {
      data,
    });
  });

  test('should configure chat', async () => {
    const data = {
      namespace_name: 'public',
      collection_name: 'chatbees',
      chat_attributes: {
        persona: 'a 1600s pirate',
        negative_response: 'You have come to the wilderness of knowledge!',
      },
    };
    await chatClient.configureChat(data);
    expect(mockPost).toHaveBeenCalledWith('/docs/configure_chat', {
      data,
    });
  });
});
