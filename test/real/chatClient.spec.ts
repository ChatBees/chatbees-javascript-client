import { configDotenv } from 'dotenv';
import { ChatClient } from '../../src';

configDotenv();

describe('ChatClient', () => {
  let chatClient: ChatClient;

  beforeEach(() => {
    chatClient = new ChatClient(process.env.ACCOUNT_ID!, process.env.API_KEY);
    const originalPost = chatClient['post'];
    jest
      .spyOn(chatClient as any, 'post')
      .mockImplementation((path: any, payload?: any) => {
        console.log(
          'post called with:',
          path,
          JSON.stringify(payload, null, 2)
        );
        return originalPost.call(chatClient, path, payload);
      });
  });

  test('should ask question', async () => {
    expect(chatClient.history.length).toBe(0);

    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      question: 'What is HTML?',
    };
    await chatClient.ask(data);
    expect(chatClient.history.length).toBe(1);

    data.question = 'What is CSS?';
    await chatClient.ask(data);
    expect(chatClient.history.length).toBe(2);

    chatClient.resetConversation();
    expect(chatClient.history.length).toBe(0);

    data.question = 'What is JavaScript?';
    const response = await chatClient.ask(data);
    expect(chatClient.history.length).toBe(1);
    expect(response).toBeTruthy();
  }, 20000);

  test('should create or update feedback', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      feedback: 'good',
      request_id: '123',
    };

    const response = await chatClient.createOrUpdateFeedBack(data);
    expect(response).toBeTruthy();
  }, 20000);

  test('should configure chat', async () => {
    const data = {
      namespace_name: process.env.NAMESPACE_NAME!,
      collection_name: process.env.COLLECTION_NAME!,
      chat_attributes: {},
    };
    const response = await chatClient.configureChat(data);
    expect(response).toBeTruthy();
  });
});
