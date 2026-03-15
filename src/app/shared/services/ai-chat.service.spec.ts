import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { firstValueFrom, of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiClientService } from '../../core/api/api-client.service';
import { AiChatService, AiChatMessageResponse } from './ai-chat.service';

const ANGULAR_TEST_ENV_KEY = '__health_hub_angular_test_env__';

if (!(globalThis as Record<string, unknown>)[ANGULAR_TEST_ENV_KEY]) {
  getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  (globalThis as Record<string, unknown>)[ANGULAR_TEST_ENV_KEY] = true;
}

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
      showDiagnosticsCta: false,
      triage: {
        complaint: 'I have a sore throat',
        triageAnswers: [],
        triageSummary: '',
        recommendedNextStep: '',
      },
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
    expect(service.getCurrentState().triage?.complaint).toBe('I have a sore throat');
  });

  it('should return zero for unknown sessions', () => {
    expect(service.getMessageCount('unknown-session')).toBe(0);
  });
});
