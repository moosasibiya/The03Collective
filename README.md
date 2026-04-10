# The 03 Collective

Production website for The 03 Collective, built with Next.js App Router, Sanity CMS, Prisma, and Resend.

## Stack

- Next.js 16
- React 19
- Sanity for inventory and testimonials
- Prisma with PostgreSQL
- Resend for transactional email
- Sentry for error tracking
- Vercel Analytics and Speed Insights

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment template and fill in values:

```bash
cp .env.example .env.local
```

3. Generate the Prisma client:

```bash
pnpm db:generate
```

4. Start the app:

```bash
pnpm dev
```

## Quality checks

```bash
pnpm type-check
pnpm lint
pnpm build
pnpm deploy:check
```

`pnpm verify` runs type-check, lint, and build in sequence.

## Required environment variables

These must be set before production deploys:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `DATABASE_URL`
- `DIRECT_URL`
- `RESEND_API_KEY`
- `BUSINESS_EMAIL`
- `NEXT_PUBLIC_BUSINESS_WHATSAPP`
- `NEXT_PUBLIC_BUSINESS_PHONE`
- `NEXT_PUBLIC_BUSINESS_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

## Recommended environment variables

These are not strictly required for a successful build, but the production site is incomplete without them:

- `NEXT_PUBLIC_INSTAGRAM_HANDLE`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_AUTH_TOKEN`
- `SANITY_STUDIO_ENABLED`

## Database setup

The Prisma datasource uses:

- `DATABASE_URL` for runtime traffic
- `DIRECT_URL` for migrations and schema push operations

This repo currently does not include a committed `prisma/migrations` directory. Before going live, you need to apply the schema to the production database:

```bash
pnpm db:push
```

If you later move to migration-based deployment, commit the generated migrations and use them in CI/CD.

## Deployment

Vercel is the intended deployment target.

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all required production environment variables.
4. Connect both `the03collective.co.za` and `www.the03collective.co.za`.
5. Set `www.the03collective.co.za` as the primary domain.
6. Run `pnpm db:push` against the production database.
7. Submit test forms for contact, enquiry, and consignment on the live site.
8. Confirm email delivery in Resend and records being written to the database.

## Sanity Studio

The embedded `/studio` route is disabled in production by default.

To expose it on the live site, set:

```bash
SANITY_STUDIO_ENABLED=true
```

If you do not need Studio on the public domain, leave it disabled.

## CI

GitHub Actions runs:

- Prisma client generation
- type-check
- lint
- formatting check
- production build

The workflow lives at `.github/workflows/ci.yml`.
