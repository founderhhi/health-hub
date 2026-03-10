import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { vi } from 'vitest';
import { ApiClientService } from '../../core/api/api-client.service';
import { AiChatService, AiChatMessageResponse } from './ai-chat.service';

describe('AiChatService', () => {
  const apiClientMock = {
    post: vi.fn(),
  };

  let service: AiChatService;

  beforeEach(() => {
    apiClientMock.post.mockReset();

    TestBed.configureTestingModule({
      providers: [
        AiChatService,
        { provide: ApiClientService, useValue: apiClientMock },
      ],
    });

    service = TestBed.inject(AiChatService);
  });

  it('should start a session with zero message count', () => {
    const sessionId = service.startSession();

    expect(sessionId).toBeTruthy();
    expect(service.getMessageCount(sessionId)).toBe(0);
  });

  it('should send message and update local message count cache', async () => {
    const response: AiChatMessageResponse = {
      reply: 'Thanks for sharing your symptoms.',
      messageCount: 2,
      limitReached: false,
      showGpCta: false,
    };
    apiClientMock.post.mockReturnValue(of(response));

    const sessionId = 'session-1';
    const result = await firstValueFrom(service.sendMessage(sessionId, 'I have a sore throat'));

    expect(apiClientMock.post).toHaveBeenCalledWith('/ai-chat/message', {
      sessionId,
      message: 'I have a sore throat',
    });
    expect(result).toEqual(response);
    expect(service.getMessageCount(sessionId)).toBe(2);
  });

  it('should return zero for unknown sessions', () => {
    expect(service.getMessageCount('unknown-session')).toBe(0);
  });
});
