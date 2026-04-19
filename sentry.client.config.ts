import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    // Privacy: mask all user input and block media in session replays.
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  beforeSend(event) {
    if (event.request?.data) {
      const data = event.request.data as Record<string, unknown>
      if (data.phone) data.phone = '[REDACTED]'
      if (data.email) data.email = '[REDACTED]'
      if (data.message) data.message = '[REDACTED]'
    }

    return event
  },
})
