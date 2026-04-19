const required = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_READ_TOKEN',
  'DATABASE_URL',
  'DIRECT_URL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'RESEND_API_KEY',
  'BUSINESS_EMAIL',
  'NEXT_PUBLIC_BUSINESS_WHATSAPP',
  'NEXT_PUBLIC_BUSINESS_PHONE',
  'NEXT_PUBLIC_BUSINESS_EMAIL',
  'NEXT_PUBLIC_SITE_URL',
]

const recommended = [
  'NEXT_PUBLIC_INSTAGRAM_HANDLE',
  'NEXT_PUBLIC_INSTAGRAM_URL',
  'NEXT_PUBLIC_FACEBOOK_URL',
  'NEXT_PUBLIC_TIKTOK_URL',
  'NEXT_PUBLIC_SENTRY_DSN',
  'SENTRY_ORG',
  'SENTRY_PROJECT',
  'SENTRY_AUTH_TOKEN',
]

function getMissing(names) {
  return names.filter((name) => {
    const value = process.env[name]
    return typeof value !== 'string' || value.trim() === ''
  })
}

function write(message = '') {
  process.stdout.write(`${message}\n`)
}

function logList(label, values) {
  write(`${label}:`)
  for (const value of values) {
    write(`- ${value}`)
  }
}

const missingRequired = getMissing(required)
const missingRecommended = getMissing(recommended)
const studioEnabled = process.env.SANITY_STUDIO_ENABLED === 'true'

write('Deployment preflight')
write(`- Studio enabled in production: ${studioEnabled ? 'yes' : 'no'}`)

if (missingRequired.length > 0) {
  logList('Missing required environment variables', missingRequired)
  process.exitCode = 1
} else {
  write('- Required environment variables: complete')
}

if (missingRecommended.length > 0) {
  logList('Missing recommended environment variables', missingRecommended)
} else {
  write('- Recommended environment variables: complete')
}

if (process.exitCode === 1) {
  process.stderr.write('Deployment preflight failed.\n')
} else {
  write('Deployment preflight passed.')
}
