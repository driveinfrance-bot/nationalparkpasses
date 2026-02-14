# Deployment Guide

This guide walks you through deploying the Crit'Air application to Vercel and connecting your GoDaddy domain.

## Prerequisites

- ✅ Code is committed to Git
- ⏳ GitHub repository created
- ⏳ Vercel account (sign up at https://vercel.com)
- ⏳ Production database (Vercel Postgres, Supabase, or other)
- ✅ Stripe production keys (already configured)

## Step 1: Push to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
# If you don't have a remote yet:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub:
git push -u origin main
```

## Step 2: Set Up Production Database

**Important**: The Prisma schema has been updated to use PostgreSQL. You need a production database.

### Option A: Vercel Postgres (Recommended - Easiest)

1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Create a new Postgres database
4. Copy the connection string (will be used as `DATABASE_URL`)

### Option B: Supabase (Free Tier)

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (format: `postgresql://...`)

### Option C: Other Providers

- **PlanetScale** (MySQL - requires schema changes)
- **Neon** (Postgres - free tier)
- **Railway** (Postgres - free tier)

## Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign in (use GitHub account)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. **Before deploying**, configure environment variables (see Step 4)

## Step 4: Configure Environment Variables

In **Vercel Dashboard → Your Project → Settings → Environment Variables**, add:

### Required Variables:

```
STRIPE_SECRET_KEY=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
STRIPE_PRICE_ID=price_1SkFS72LwiN7Srs5Mq7irsCG
BASE_URL=https://www.driveinfrance.com
STRIPE_WEBHOOK_SECRET=whsec_5lWTizOo136lRl8BcwBtJAyuKcVYBoEt
DATABASE_URL=<your-production-database-connection-string>
BLOB_READ_WRITE_TOKEN=<get-from-vercel-blob-storage>
```

### Optional but Recommended:

```
RESEND_API_KEY=<your-resend-api-key>
SUPPORT_EMAIL=support@driveinfrance.co
ADMIN_TOKEN=<generate-a-secure-random-token-for-admin-routes>
```

**Important Notes**:
- Set these for **"Production"** environment
- `BASE_URL` should be your production domain
- `DATABASE_URL` comes from your database provider (Step 2)
- `BLOB_READ_WRITE_TOKEN` is needed for file uploads (see below)
- `RESEND_API_KEY` is needed for email functionality (contact forms, order confirmations)
- `SUPPORT_EMAIL` defaults to "support@driveinfrance.co" if not set
- `ADMIN_TOKEN` is required to access admin order pages (`/admin/orders`)

### Setting Up Vercel Blob Storage

1. In Vercel dashboard, go to Storage → Create Database → Blob
2. Create a new Blob store
3. Copy the `BLOB_READ_WRITE_TOKEN` from the store settings
4. Add it to environment variables

### Setting Up Resend for Email

1. Go to https://resend.com and sign up/login
2. Create an API key in the dashboard
3. Add the API key to Vercel as `RESEND_API_KEY`
4. Optionally set `SUPPORT_EMAIL` (defaults to "support@driveinfrance.co")
5. **Note**: Without `RESEND_API_KEY`, emails will be skipped (contact forms won't send emails, order confirmations won't be sent)

## Step 5: Run Production Database Migration

After setting up the database and `DATABASE_URL`:

1. In Vercel dashboard, go to your project → Settings → Environment Variables
2. Temporarily add `DATABASE_URL` if not already added
3. Use Vercel CLI or run migrations manually:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Link your project
vercel link

# Run migrations
npx prisma migrate deploy
```

Alternatively, you can add a build script to run migrations automatically (see `vercel.json`).

## Step 6: Configure Stripe Webhook for Production

1. Go to https://dashboard.stripe.com/webhooks
2. Edit your existing webhook or create a new one
3. Set endpoint URL to: `https://www.driveinfrance.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copy the new webhook secret (may be different from test mode)
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

## Step 7: Connect GoDaddy Domain to Vercel

### In Vercel Dashboard:

1. Go to your project → Settings → Domains
2. Click "Add Domain"
3. Enter: `www.driveinfrance.com`
4. Vercel will provide DNS records to add

### In GoDaddy DNS Settings:

1. Log in to GoDaddy
2. Go to Domain Management → DNS
3. Add/Update records as provided by Vercel:
   - **CNAME** record: `www` → `cname.vercel-dns.com` (or value provided by Vercel)
   - Or **A record** instructions if provided
4. Save changes

**DNS Propagation**: Can take 24-48 hours, usually faster (1-2 hours)

## Step 8: Update BASE_URL After Domain is Live

Once domain is connected and working:

1. Verify `BASE_URL` in Vercel is set to `https://www.driveinfrance.com`
2. This ensures Stripe redirects work correctly
3. Redeploy if needed

## Step 9: Test Production Deployment

Checklist:

- [ ] Site loads at www.driveinfrance.com
- [ ] Form submission works
- [ ] File uploads work (using Vercel Blob)
- [ ] Stripe Checkout redirects correctly
- [ ] Webhook receives events (check Stripe dashboard)
- [ ] Order status updates after payment
- [ ] Emails send correctly

## Troubleshooting

### Domain not connecting
- Check DNS records in GoDaddy match Vercel instructions
- Wait for DNS propagation (up to 48 hours)
- Verify domain in Vercel dashboard shows "Valid Configuration"

### Database errors
- Verify `DATABASE_URL` is correct in Vercel
- Check database provider allows connections from Vercel IPs
- Run migrations: `npx prisma migrate deploy`

### Stripe webhook not working
- Verify webhook URL is correct in Stripe dashboard
- Check webhook secret matches Vercel environment variable
- Test webhook in Stripe dashboard → Webhooks → Send test webhook

### File uploads not working
- Verify `BLOB_READ_WRITE_TOKEN` is set in Vercel
- Check Vercel Blob storage is created and active
- Review Vercel function logs for errors

## Local Development After Schema Change

The Prisma schema now uses PostgreSQL. For local development:

1. Set up a local Postgres database, OR
2. Use a cloud Postgres database (Supabase free tier works well)
3. Set `DATABASE_URL` in `.env.local`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/critair_dev"
   ```
4. Run migrations: `npx prisma migrate dev`
5. Generate Prisma Client: `npx prisma generate`

## Next Steps After Deployment

1. Set up monitoring (Vercel Analytics)
2. Configure error tracking (Sentry, etc.)
3. Set up backup strategy for database
4. Configure CDN for static assets (Vercel handles this automatically)
5. Set up staging environment (optional)
