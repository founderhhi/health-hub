export async function createDailyRoom(): Promise<string> {
  const apiKey = process.env['DAILY_API_KEY'];
  const fallbackRoom = process.env['DAILY_FALLBACK_ROOM'] || 'https://healthhub.daily.co/demo';

  if (!apiKey) {
    console.warn('DAILY_API_KEY not set. Returning fallback Daily room URL.');
    return fallbackRoom;
  }

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
}
