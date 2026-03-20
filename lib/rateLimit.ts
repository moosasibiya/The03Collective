// Simple in-memory rate limiter
// For production, swap with @upstash/ratelimit + Vercel KV

const requests = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60 * 1000
const MAX_PER_IP = 5

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = requests.get(ip)

  if (!record || now > record.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_PER_IP - 1 }
  }

  if (record.count >= MAX_PER_IP) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: MAX_PER_IP - record.count }
}
