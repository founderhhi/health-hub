import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiClientService } from '../../../core/api/api-client.service';
import { WsConnectionState, WsService } from '../../../core/realtime/ws.service';
import { ChatPanelComponent } from './chat-panel';

const ANGULAR_TEST_ENV_KEY = '__health_hub_angular_test_env__';

if (!(globalThis as Record<string, unknown>)[ANGULAR_TEST_ENV_KEY]) {
  try {
    getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    (globalThis as Record<string, unknown>)[ANGULAR_TEST_ENV_KEY] = true;
  } catch {
    // ng test may have already initialized the Angular testing environment.
  }
}

describe('ChatPanelComponent', () => {
  let fixture: ComponentFixture<ChatPanelComponent>;
  let component: ChatPanelComponent;
  let wsEvents: Subject<{ event: string; data: unknown }>;
  let connectionState: BehaviorSubject<WsConnectionState>;
  let api: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };
  let ws: {
    connect: ReturnType<typeof vi.fn>;
    events$: Subject<{ event: string; data: unknown }>;
    connectionState$: BehaviorSubject<WsConnectionState>;
  };

  beforeEach(async () => {
    wsEvents = new Subject<{ event: string; data: unknown }>();
    connectionState = new BehaviorSubject<WsConnectionState>('disconnected');
    api = {
      get: vi.fn(() => of({ messages: [] })),
      post: vi.fn(),
    };
    ws = {
      connect: vi.fn(),
      events$: wsEvents,
      connectionState$: connectionState,
    };

    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: vi.fn((key: string) => {
          if (key === 'hhi_user_id') {
            return 'user-1';
          }
          if (key === 'access_token') {
            return 'token-1';
          }
          return null;
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
    });

    await TestBed.configureTestingModule({
      imports: [ChatPanelComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: ApiClientService, useValue: api as unknown as ApiClientService },
        { provide: WsService, useValue: ws as unknown as WsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPanelComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
    fixture?.destroy();
  });

  it('falls back to polling while realtime is disconnected and stops once connected', async () => {
    vi.useFakeTimers();

    fixture.componentRef.setInput('consultationId', 'consult-1');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(ws.connect).toHaveBeenCalledWith('consultation-chat');
    expect(api.get).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(2100);
    expect(api.get).toHaveBeenCalledTimes(2);

    connectionState.next('connected');
    await vi.advanceTimersByTimeAsync(2100);
    expect(api.get).toHaveBeenCalledTimes(2);
  });

  it('shows optimistic messages immediately and reconciles them with the confirmed realtime payload', async () => {
    const sendResponse$ = new Subject<{ message: any }>();
    api.post.mockReturnValue(sendResponse$.asObservable());
    connectionState.next('connected');

    fixture.componentRef.setInput('consultationId', 'consult-1');
    fixture.detectChanges();
    await fixture.whenStable();

    component.draft = 'Please share the latest notes.';
    component.sendMessage();

    expect(component.messages).toHaveLength(1);
    expect(component.messages[0]?.pending).toBe(true);
    expect(component.messages[0]?.message).toBe('Please share the latest notes.');
    expect(component.messages[0]?.senderLabel).toBe('You');
    expect(component.draft).toBe('');

    const [, requestBody] = api.post.mock.calls[0] || [];
    expect(requestBody?.message).toBe('Please share the latest notes.');
    expect(typeof requestBody?.clientRequestId).toBe('string');

    wsEvents.next({
      event: 'chat.message',
      data: {
        consultationId: 'consult-1',
        message: {
          id: 'msg-1',
          consultation_id: 'consult-1',
          user_id: 'user-1',
          message: 'Please share the latest notes.',
          created_at: '2026-03-15T10:00:00.000Z',
          sender_name: 'Dr Avery',
          sender_role: 'gp',
          client_request_id: requestBody.clientRequestId,
        },
      },
    });

    expect(component.messages).toHaveLength(1);
    expect(component.messages[0]?.id).toBe('msg-1');
    expect(component.messages[0]?.pending).toBeFalsy();
    expect(component.messages[0]?.senderLabel).toBe('You');

    sendResponse$.next({
      message: {
        id: 'msg-1',
        consultation_id: 'consult-1',
        user_id: 'user-1',
        message: 'Please share the latest notes.',
        created_at: '2026-03-15T10:00:00.000Z',
        sender_name: 'Dr Avery',
        sender_role: 'gp',
        client_request_id: requestBody.clientRequestId,
      },
    });
    sendResponse$.complete();

    expect(component.messages).toHaveLength(1);
    expect(component.messages[0]?.id).toBe('msg-1');
    expect(component.messages[0]?.pending).toBeFalsy();
  });
});
