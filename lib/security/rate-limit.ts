const store = new Map<string, { count: number; expires: number }>();

export function rateLimit(key: string, limit = 25, windowMs = 60_000) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.expires <= now) {
    store.set(key, { count: 1, expires: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { success: false, remaining: 0 };
  }

  current.count += 1;
  store.set(key, current);
  return { success: true, remaining: limit - current.count };
}
