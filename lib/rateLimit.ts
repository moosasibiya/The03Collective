import * as Sentry from '@sentry/nextjs'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const WINDOW = '1 m'
const MAX_PER_IP = 5
const PREFIX = 'the03collective:rate-limit'

type RateLimitResult = {
  allowed: boolean
  remaining: number
  reset: number
}

let ratelimiter: ReturnType<typeof createRatelimiter> | null = null

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new Error('Upstash Redis environment variables are not configured')
  }

  return { url, token }
}

function createRatelimiter() {
  const { url, token } = getRedisConfig()

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_PER_IP, WINDOW),
    prefix: PREFIX,
  })
}

function getRatelimiter() {
  if (!ratelimiter) {
    ratelimiter = createRatelimiter()
  }

  return ratelimiter
}

export async function rateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const result = await getRatelimiter().limit(ip)

    return {
      allowed: result.success,
      remaining: result.remaining,
      reset: result.reset,
    }
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
}
