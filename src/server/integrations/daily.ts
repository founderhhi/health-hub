export async function createDailyRoom(): Promise<string> {
  const apiKey = process.env['DAILY_API_KEY'];
  const fallbackRoom = resolveFallbackRoom(process.env['DAILY_FALLBACK_ROOM'] || 'https://healthhub.daily.co/demo');

  if (!apiKey) {
    console.warn('DAILY_API_KEY not set. Returning fallback Daily room URL.');
    return fallbackRoom;
  }

  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          enable_chat: true,
          enable_screenshare: true,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour
        }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Daily room creation failed:', text);
      return fallbackRoom;
    }

    const data = (await response.json()) as { url?: string };
    return data.url || fallbackRoom;
  } catch (error) {
    console.error('Daily room creation request error:', error);
    return fallbackRoom;
  }
}

export async function createMeetingToken(
  roomName: string,
  userName: string
): Promise<string | null> {
  const apiKey = process.env['DAILY_API_KEY'];
  if (!apiKey || !roomName.trim()) {
    return null;
  }

  try {
    const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName.trim(),
          user_name: userName.trim() || 'Participant',
          exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour
        }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Daily meeting token creation failed:', text);
      return null;
    }

    const data = (await response.json()) as { token?: string };
    return data.token || null;
  } catch (error) {
    console.error('Daily meeting token request error:', error);
    return null;
  }
}

export async function deleteRoom(roomUrl: string): Promise<void> {
  const apiKey = process.env['DAILY_API_KEY'];
  if (!apiKey) {
    return;
  }

  const roomName = extractRoomName(roomUrl);
  if (!roomName) {
    return;
  }

  try {
    const response = await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.warn('Daily room deletion failed:', text);
    }
  } catch (error) {
    console.warn('Daily room deletion request error:', error);
  }
}

function extractRoomName(roomUrl: string): string | null {
  if (!roomUrl.trim()) {
    return null;
  }

  try {
    const parsed = new URL(roomUrl);
    const lastSegment = parsed.pathname.split('/').filter(Boolean).pop();
    return lastSegment || null;
  } catch {
    const lastSegment = roomUrl.split('/').filter(Boolean).pop();
    return lastSegment ? lastSegment.split('?')[0] : null;
  }
}

function resolveFallbackRoom(fallback: string): string {
  try {
    const parsed = new URL(fallback);
    const currentPath = parsed.pathname.replace(/^\/+|\/+$/g, '');

    if (currentPath === 'demo') {
      const suffix = Math.random().toString(36).slice(2, 10);
      parsed.pathname = `/healthhub-${suffix}`;
      return parsed.toString();
    }

    return fallback;
  } catch {
    return fallback;
  }
}
