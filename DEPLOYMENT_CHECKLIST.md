# Deployment Checklist

Use this checklist to track your deployment progress.

## ✅ Code Preparation (COMPLETED)

- [x] Updated Prisma schema for PostgreSQL
- [x] Set up Vercel Blob for file uploads
- [x] Updated .gitignore to exclude dev files
- [x] Created deployment guide
- [x] Created helper scripts
- [x] Committed all changes to Git

## 📋 Manual Steps Required

### Step 1: GitHub Repository
- [ ] Create a new repository on GitHub (if you don't have one)
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`
- [ ] Push code: `git push -u origin main`

### Step 2: Production Database
- [ ] Choose database provider (Vercel Postgres, Supabase, etc.)
- [ ] Create database instance
- [ ] Copy connection string (will be `DATABASE_URL`)

### Step 3: Vercel Deployment
- [ ] Sign in to Vercel (https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Import GitHub repository
- [ ] Configure build settings (auto-detected for Next.js)

### Step 4: Environment Variables
Set these in **Vercel Dashboard → Settings → Environment Variables**:

**Required:**
- [ ] `STRIPE_SECRET_KEY` = `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`
- [ ] `STRIPE_PRICE_ID` = `price_1SkFS72LwiN7Srs5Mq7irsCG`
- [ ] `BASE_URL` = `https://www.driveinfrance.com`
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_5lWTizOo136lRl8BcwBtJAyuKcVYBoEt`
- [ ] `DATABASE_URL` = (from your database provider)
- [ ] `BLOB_READ_WRITE_TOKEN` = (from Vercel Blob Storage)

**Optional but Recommended:**
- [ ] `RESEND_API_KEY` = (from Resend.com for email functionality)
- [ ] `SUPPORT_EMAIL` = `support@driveinfrance.co` (defaults if not set)
- [ ] `ADMIN_TOKEN` = (generate secure random token for `/admin/orders` access)

### Step 5: Vercel Blob Storage
- [ ] Go to Vercel Dashboard → Storage → Create Database → Blob
- [ ] Create new Blob store
- [ ] Copy `BLOB_READ_WRITE_TOKEN`
- [ ] Add to environment variables (see Step 4)

### Step 6: Database Migration
- [ ] Run migrations on production database:
  ```bash
  # Using Vercel CLI
  vercel link
  vercel env pull .env.production
  npx prisma migrate deploy
  ```
  OR use the helper script after setting DATABASE_URL:
  ```bash
  npm run setup-db
  ```

### Step 7: Stripe Webhook
- [ ] Go to Stripe Dashboard → Webhooks
- [ ] Update endpoint URL to: `https://www.driveinfrance.com/api/stripe/webhook`
- [ ] Select events: `checkout.session.completed`, `payment_intent.succeeded`
- [ ] Copy new webhook secret (if different)
- [ ] Update `STRIPE_WEBHOOK_SECRET` in Vercel if changed

### Step 8: Domain Connection
- [ ] In Vercel: Settings → Domains → Add `www.driveinfrance.com`
- [ ] Copy DNS records from Vercel
- [ ] In GoDaddy: Domain Management → DNS
- [ ] Add CNAME record: `www` → (value from Vercel)
- [ ] Wait for DNS propagation (1-48 hours)

### Step 9: Final Configuration
- [ ] Verify `BASE_URL` is set to `https://www.driveinfrance.com` in Vercel
- [ ] Redeploy if needed after domain is live

### Step 10: Testing
- [ ] Site loads at www.driveinfrance.com
- [ ] Form submission works
- [ ] File uploads work
- [ ] Stripe Checkout redirects correctly
- [ ] Webhook receives events (check Stripe dashboard)
- [ ] Order status updates after payment
- [ ] Emails send correctly

## 🆘 Troubleshooting

If you encounter issues, check:
- [ ] All environment variables are set correctly
- [ ] Database connection string is valid
- [ ] DNS records are correct and propagated
- [ ] Webhook URL matches production domain
- [ ] Vercel build logs for errors

## 📚 Resources

- Full deployment guide: See `DEPLOYMENT.md`
- Vercel documentation: https://vercel.com/docs
- Stripe webhooks: https://stripe.com/docs/webhooks
- Prisma migrations: https://www.prisma.io/docs/guides/migrate
