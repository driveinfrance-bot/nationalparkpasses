# Detailed Step-by-Step Deployment Instructions

This guide provides detailed, click-by-click instructions for deploying your Crit'Air application to production.

## ✅ Completed Steps
- [x] Code is committed to Git
- [x] Code is pushed to GitHub (https://github.com/driveinfrance-bot/driveinfrancewebsite.git)

---

## Step 1: Create Vercel Account & Import Repository

### 1.1 Sign Up / Sign In to Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Choose **"Continue with GitHub"** (recommended - easiest integration)
4. Authorize Vercel to access your GitHub account when prompted

### 1.2 Import Your GitHub Repository
1. Once logged in, you'll see the Vercel dashboard
2. Click the **"+ Add New..."** button (top right corner) or **"Add New Project"** button
3. You should see a list of your GitHub repositories
4. Find and click on **"driveinfrancewebsite"** (or search for it)
5. Click **"Import"** button

### 1.3 Configure Project Settings
Vercel should auto-detect Next.js settings, but verify:

**Project Name:**
- Can be left as default: `driveinfrancewebsite`
- Or change to: `driveinfrance` or `critair-app`

**Framework Preset:**
- Should show: **"Next.js"** (auto-detected)

**Root Directory:**
- Leave as default: **"."** (root)

**Build and Output Settings:**
- **Build Command:** `prisma generate && npm run build` (already in vercel.json)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

**⚠️ IMPORTANT: DO NOT CLICK "DEPLOY" YET**
- We need to set up the database and environment variables first

---

## Step 2: Set Up Production Database

You need a PostgreSQL database for production. Choose one option:

### Option A: Vercel Postgres (Recommended - Easiest Integration)

#### 2A.1 Create Vercel Postgres Database
1. In your Vercel dashboard, click **"Storage"** in the left sidebar
2. Click **"Create Database"** button
3. Select **"Postgres"**
4. Click **"Continue"**
5. Choose a database name (e.g., `driveinfrance-db` or `critair-production`)
6. Select a region closest to your users (e.g., `US East` or `Europe`)
7. Choose the **"Hobby"** plan (Free tier - good for starting)
8. Click **"Create Database"**

#### 2A.2 Get Connection String
1. Once created, click on your database name
2. Go to the **"Settings"** tab
3. Find **"Connection String"** or **"Connection Pooling"** section
4. Copy the connection string (it looks like: `postgres://...` or `postgresql://...`)
   - **Save this somewhere safe** - you'll need it as `DATABASE_URL`
5. Also note the **"Database URL"** if shown separately

**⚠️ Important:** 
- Vercel Postgres uses connection pooling
- Use the **"Connection Pooling"** URL for better performance
- The URL format will be something like: `postgres://default:xxx@xxx.aws.neon.tech:5432/verceldb?sslmode=require`

### Option B: Supabase (Free Tier - Alternative)

#### 2B.1 Create Supabase Account
1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub or email
4. Verify your email if needed

#### 2B.2 Create New Project
1. Click **"New Project"** button
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name:** `driveinfrance` or `critair-production`
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (if available)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project setup

#### 2B.3 Get Connection String
1. Once project is ready, click on your project
2. Go to **"Settings"** (gear icon in left sidebar)
3. Click **"Database"** in the settings menu
4. Scroll to **"Connection String"** section
5. Select **"URI"** tab
6. Copy the connection string (starts with `postgresql://...`)
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`
   - Replace `[YOUR-PASSWORD]` with the password you set earlier
   - **Save this** - this is your `DATABASE_URL`

### Option C: Neon (Free Tier - Another Alternative)

1. Go to **https://neon.tech**
2. Click **"Sign Up"** (with GitHub recommended)
3. Click **"Create a project"**
4. Choose project name and region
5. After creation, go to **"Connection Details"**
6. Copy the connection string - this is your `DATABASE_URL`

---

## Step 3: Set Up Vercel Blob Storage (For File Uploads)

### 3.1 Create Blob Storage
1. In Vercel dashboard, click **"Storage"** in the left sidebar
2. Click **"Create Database"** button
3. Select **"Blob"**
4. Click **"Continue"**
5. Choose a store name (e.g., `driveinfrance-uploads` or `critair-blob`)
6. Select a region (same as your database region recommended)
7. Click **"Create"**

### 3.2 Get Blob Token
1. Click on your newly created Blob store
2. Go to the **"Settings"** tab
3. Find **"API Access"** or **"Environment Variables"** section
4. Copy the **`BLOB_READ_WRITE_TOKEN`** value
   - **Save this** - you'll add it to environment variables
5. The token will look like: `vercel_blob_rw_xxxxxxxxxxxxx`

---

## Step 4: Set Up Resend for Email (Optional but Recommended)

### 4.1 Create Resend Account
1. Go to **https://resend.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with email or GitHub
4. Verify your email

### 4.2 Create API Key
1. Once logged in, go to **"API Keys"** in the left sidebar
2. Click **"Create API Key"** button
3. Give it a name (e.g., `Drive in France Production`)
4. Select permissions: **"Sending access"** (or full access)
5. Click **"Add"** or **"Create"**
6. **IMPORTANT:** Copy the API key immediately (it won't be shown again!)
   - It starts with: `re_xxxxxxxxxxxxx`
   - **Save this securely** - this is your `RESEND_API_KEY`

### 4.3 Verify Domain (Optional - Recommended for Production)
For production, you should verify your domain:
1. Go to **"Domains"** in Resend
2. Click **"Add Domain"**
3. Enter: `driveinfrance.com`
4. Add the DNS records Resend provides to your GoDaddy DNS settings
5. Wait for verification (can take a few hours)

**Note:** You can use Resend without domain verification for testing, but verified domains work better for production.

---

## Step 5: Configure Environment Variables in Vercel

Now go back to your Vercel project to add all environment variables.

### 5.1 Navigate to Environment Variables
1. In Vercel dashboard, go to your project (click on `driveinfrancewebsite`)
2. Click **"Settings"** tab (top navigation)
3. Click **"Environment Variables"** in the left sidebar

### 5.2 Add Required Environment Variables

Click **"Add New"** for each variable below. Make sure to select **"Production"** environment for each:

#### Variable 1: STRIPE_SECRET_KEY
- **Key:** `STRIPE_SECRET_KEY`
- **Value:** `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`
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 2: STRIPE_PRICE_ID
- **Key:** `STRIPE_PRICE_ID`
- **Value:** `price_1SkFS72LwiN7Srs5Mq7irsCG`
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 3: BASE_URL
- **Key:** `BASE_URL`
- **Value:** `https://www.driveinfrance.com`
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 4: STRIPE_WEBHOOK_SECRET
- **Key:** `STRIPE_WEBHOOK_SECRET`
- **Value:** `whsec_5lWTizOo136lRl8BcwBtJAyuKcVYBoEt`
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 5: DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** Paste the connection string you saved from Step 2
  - From Vercel Postgres: Use the connection pooling URL
  - From Supabase: Use the URI connection string
  - From Neon: Use the connection string
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 6: BLOB_READ_WRITE_TOKEN
- **Key:** `BLOB_READ_WRITE_TOKEN`
- **Value:** Paste the token you saved from Step 3
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

### 5.3 Add Optional Environment Variables

#### Variable 7: RESEND_API_KEY (Recommended)
- **Key:** `RESEND_API_KEY`
- **Value:** Paste the API key you saved from Step 4 (starts with `re_...`)
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 8: SUPPORT_EMAIL (Recommended)
- **Key:** `SUPPORT_EMAIL`
- **Value:** `support@driveinfrance.co`
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

#### Variable 9: ADMIN_TOKEN (Recommended)
- **Key:** `ADMIN_TOKEN`
- **Value:** Generate a secure random token:
  - You can use: `openssl rand -base64 32` in terminal, or
  - Use an online generator, or
  - Use: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
  - Example output: `xK9mP2vQ7wR4tY8uI3oP6sD9fG1hJ4kL7mN0pQ3rS6tU9vW2xY5zA8bC1dE4fG7h`
- **Environment:** Select **"Production"** ✅
- Click **"Save"**

### 5.4 Verify All Variables
Scroll through the list and verify all 9 variables are present and set for Production:
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_PRICE_ID
- ✅ BASE_URL
- ✅ STRIPE_WEBHOOK_SECRET
- ✅ DATABASE_URL
- ✅ BLOB_READ_WRITE_TOKEN
- ✅ RESEND_API_KEY (optional)
- ✅ SUPPORT_EMAIL (optional)
- ✅ ADMIN_TOKEN (optional)

---

## Step 6: Run Database Migrations

Your database is empty - you need to create the tables by running Prisma migrations.

### 6.1 Install Vercel CLI (If Needed)

Open your terminal and run:

```bash
npm install -g vercel
```

### 6.2 Link Your Local Project to Vercel

```bash
cd /Users/kieranoneill/Cursor/critair
vercel link
```

When prompted:
- **Set up and develop:** Type `Y` and press Enter
- **Which scope:** Select your account
- **Link to existing project:** Type `Y` and press Enter
- **What's the name of your project:** Type your project name (e.g., `driveinfrancewebsite`) and press Enter
- **In which directory is your code located:** Press Enter (current directory)

### 6.3 Pull Environment Variables

```bash
vercel env pull .env.production
```

This creates a `.env.production` file with all your environment variables.

### 6.4 Run Migrations

```bash
npx prisma migrate deploy
```

This will:
- Connect to your production database
- Run all pending migrations
- Create all necessary tables (Order, Upload, BlogPost)

**Expected output:**
```
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "verceldb", schema "public"
Applying migration `20251231034317_add_checkout_session_id`
Migration applied successfully
```

### 6.5 Verify Migration Success

You can verify by checking your database:
- **Vercel Postgres:** Go to Storage → Your Database → Browse
- **Supabase:** Go to Table Editor in your project
- You should see tables: `Order`, `Upload`, `BlogPost`

---

## Step 7: Deploy to Vercel

Now you're ready to deploy!

### 7.1 Initial Deployment
1. Go back to Vercel dashboard
2. Click on your project
3. Go to **"Deployments"** tab
4. If there's already a deployment (from when you imported), you can:
   - Click **"Redeploy"** on the latest deployment, OR
   - Push a new commit to trigger a new deployment

### 7.2 Trigger Deployment via Git Push

If you want to trigger a fresh deployment:

```bash
cd /Users/kieranoneill/Cursor/critair
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin main
```

Then go to Vercel dashboard and watch the deployment progress.

### 7.3 Monitor Build Process

1. In Vercel, go to **"Deployments"** tab
2. Click on the latest deployment
3. Watch the build logs:
   - You should see: `Running "prisma generate"`
   - Then: `Running "npm run build"`
   - Wait for: `Build Completed`

### 7.4 Check for Build Errors

If the build fails:
- Check the build logs for errors
- Common issues:
  - Missing environment variables → Go back to Step 5
  - Database connection errors → Verify `DATABASE_URL` in Step 5
  - Build timeouts → Check your `vercel.json` configuration

### 7.5 Get Your Deployment URL

Once deployed successfully:
- Vercel will show your deployment URL (e.g., `https://driveinfrancewebsite.vercel.app`)
- This is your temporary production URL
- Note this URL - you'll need it for Stripe webhook configuration

---

## Step 8: Configure Stripe Webhook for Production

### 8.1 Access Stripe Webhooks
1. Go to **https://dashboard.stripe.com**
2. Make sure you're in **"Live mode"** (toggle in top right)
3. Click **"Developers"** in the left sidebar
4. Click **"Webhooks"**

### 8.2 Create or Edit Webhook
**If you already have a webhook:**
1. Click on your existing webhook
2. Click **"Edit"** or **"Update endpoint"**
3. Update the endpoint URL (see below)

**If creating a new webhook:**
1. Click **"Add endpoint"**
2. Fill in the endpoint URL (see below)

### 8.3 Set Endpoint URL

For the endpoint URL, use:
- **Before domain is connected:** `https://driveinfrancewebsite.vercel.app/api/stripe/webhook`
  - (Use your actual Vercel deployment URL)
- **After domain is connected:** `https://www.driveinfrance.com/api/stripe/webhook`
  - (Use your custom domain)

**For now, use your Vercel URL**, you can update it later when the domain is connected.

### 8.4 Select Events

Under **"Events to send"**, select:
- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`

Click **"Add events"** after selecting each.

### 8.5 Save and Get Webhook Secret

1. Click **"Add endpoint"** (or **"Update endpoint"** if editing)
2. After saving, click on your webhook endpoint
3. Find **"Signing secret"** section
4. Click **"Reveal"** or **"Click to reveal"**
5. Copy the webhook secret (starts with `whsec_...`)
   - **This might be different from your test mode secret!**
   - **Save this** - you'll need to update it in Vercel

### 8.6 Update Vercel Environment Variable

1. Go back to Vercel dashboard → Your Project → Settings → Environment Variables
2. Find `STRIPE_WEBHOOK_SECRET`
3. Click the three dots (...) → **"Edit"**
4. Replace the value with the new webhook secret from Step 8.5
5. Click **"Save"**
6. **Redeploy** your application (Deployments → Latest → Redeploy)

---

## Step 9: Connect GoDaddy Domain to Vercel

### 9.1 Add Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click **"Settings"** tab
3. Click **"Domains"** in the left sidebar
4. Click **"Add Domain"** button
5. Enter: `www.driveinfrance.com`
6. Click **"Add"**

### 9.2 Get DNS Records from Vercel

After adding the domain, Vercel will show you DNS configuration options:

**Option A: Recommended (Using Vercel Nameservers)**
- Vercel will provide 2-4 nameservers (e.g., `ns1.vercel-dns.com`)
- This is the easiest option

**Option B: Using CNAME/A Records**
- Vercel will show specific DNS records to add
- Typically a CNAME record: `www` → `cname.vercel-dns.com` (or similar)

**Note which option Vercel shows** - you'll need to configure this in GoDaddy.

### 9.3 Configure DNS in GoDaddy

#### If Using Vercel Nameservers (Recommended):

1. Log in to **https://godaddy.com**
2. Click **"My Products"** or **"Domain Manager"**
3. Find `driveinfrance.com` and click **"DNS"** or **"Manage DNS"**
4. Scroll to **"Nameservers"** section
5. Click **"Change"** or **"Edit"**
6. Select **"Custom"** or **"I'll use my own nameservers"**
7. Delete existing nameservers
8. Add the nameservers Vercel provided (usually 2-4 nameservers)
9. Click **"Save"**

#### If Using CNAME/A Records:

1. Log in to **https://godaddy.com**
2. Click **"My Products"** or **"Domain Manager"**
3. Find `driveinfrance.com` and click **"DNS"** or **"Manage DNS"**
4. Find the **"Records"** section
5. Look for existing `www` CNAME or A record
   - If it exists: Click **"Edit"** and update the value
   - If it doesn't: Click **"Add"** → **"CNAME"**
6. Configure:
   - **Name/Host:** `www`
   - **Value/Points to:** Copy from Vercel (e.g., `cname.vercel-dns.com`)
   - **TTL:** Leave default (usually 600 seconds)
7. Click **"Save"** or **"Add Record"**

### 9.4 Wait for DNS Propagation

DNS changes can take:
- **Minimum:** 5 minutes
- **Average:** 1-2 hours
- **Maximum:** 24-48 hours

You can check propagation status:
- In Vercel: Go to Settings → Domains → Your domain should show status
- Use online tools: https://dnschecker.org
- Check from terminal: `nslookup www.driveinfrance.com`

### 9.5 Verify Domain in Vercel

1. In Vercel dashboard → Settings → Domains
2. Your domain should show status:
   - **"Valid Configuration"** ✅ (when ready)
   - **"Invalid Configuration"** (if DNS isn't propagated yet)
3. Once valid, Vercel will automatically issue an SSL certificate

---

## Step 10: Update Configuration After Domain is Live

### 10.1 Verify Domain is Working

1. Open browser and go to: `https://www.driveinfrance.com`
2. Your site should load (might take a few minutes after DNS propagates)
3. If you see "Invalid SSL Certificate" error, wait a few more minutes

### 10.2 Update BASE_URL (If Needed)

1. In Vercel → Settings → Environment Variables
2. Verify `BASE_URL` is set to: `https://www.driveinfrance.com`
3. If it's different, update it and redeploy

### 10.3 Update Stripe Webhook URL

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your webhook
3. Click **"Update endpoint"**
4. Change URL to: `https://www.driveinfrance.com/api/stripe/webhook`
5. Click **"Update endpoint"**
6. Copy the new webhook secret (if changed)
7. Update `STRIPE_WEBHOOK_SECRET` in Vercel if the secret changed
8. Redeploy your Vercel application

### 10.4 Update Vercel Domain Configuration

1. In Vercel → Settings → Domains
2. Verify `www.driveinfrance.com` shows as **"Valid Configuration"**
3. Optionally, you can also add `driveinfrance.com` (without www) and set up redirect

---

## Step 11: Testing Production Deployment

Run through this comprehensive test checklist:

### 11.1 Basic Site Tests

- [ ] **Homepage loads:** Visit `https://www.driveinfrance.com`
- [ ] **All pages accessible:** 
  - [ ] `/apply` - Application flow page
  - [ ] `/pricing` - Pricing page
  - [ ] `/contact` - Contact page
  - [ ] `/faq` - FAQ page
  - [ ] `/blog` - Blog listing
  - [ ] `/how-it-works` - How it works page

### 11.2 Application Flow Tests

- [ ] **Start application:** Go to `/apply` and click "Get Started"
- [ ] **Upload file:** Upload a registration document (should use Vercel Blob)
- [ ] **Address form:** Fill out address details
- [ ] **Review page:** Verify all information is displayed correctly
- [ ] **Payment redirect:** Click "Pay Now" - should redirect to Stripe Checkout

### 11.3 Stripe Payment Tests

**⚠️ Use Stripe test mode first!** (Or use a real payment if you're ready)

- [ ] **Checkout loads:** Stripe Checkout page appears
- [ ] **Test payment:** Use test card `4242 4242 4242 4242`
- [ ] **Success redirect:** After payment, redirects to `/success`
- [ ] **Cancel works:** Click cancel, redirects to `/cancelled`

### 11.4 Webhook Tests

- [ ] **Check Stripe Dashboard:** 
  - Go to Stripe Dashboard → Developers → Webhooks
  - Click on your webhook
  - Go to **"Logs"** tab
  - You should see recent webhook events (checkout.session.completed)
- [ ] **Check webhook success:** Events should show status "200 OK"
- [ ] **Check order status:** After payment, order should be marked as "paid" in database

### 11.5 Email Tests

- [ ] **Order confirmation email:** Check customer email inbox
- [ ] **Admin notification email:** Check support email inbox
- [ ] **Contact form:** Submit contact form, check if email is received

### 11.6 Admin Tests

- [ ] **Admin page access:** Go to `/admin/orders`
- [ ] **Authentication:** Should prompt for password (ADMIN_TOKEN)
- [ ] **View orders:** Should see list of orders in database

### 11.7 File Upload Tests

- [ ] **Upload works:** File uploads should work
- [ ] **File accessible:** Uploaded files should be accessible via URL
- [ ] **Check Vercel Blob:** Verify files appear in Vercel Blob storage dashboard

### 11.8 Database Tests

- [ ] **Orders created:** Check that orders are saved to database
- [ ] **File uploads saved:** Check that upload records exist
- [ ] **Order updates:** Verify order status updates after payment

---

## Step 12: Final Verification

### 12.1 Check All Environment Variables

In Vercel → Settings → Environment Variables, verify all are present:
- ✅ STRIPE_SECRET_KEY (live key)
- ✅ STRIPE_PRICE_ID
- ✅ BASE_URL (`https://www.driveinfrance.com`)
- ✅ STRIPE_WEBHOOK_SECRET (production webhook secret)
- ✅ DATABASE_URL (production database)
- ✅ BLOB_READ_WRITE_TOKEN
- ✅ RESEND_API_KEY
- ✅ SUPPORT_EMAIL
- ✅ ADMIN_TOKEN

### 12.2 Check Vercel Deployment Status

1. Go to Vercel → Your Project → Deployments
2. Latest deployment should show:
   - ✅ Status: **"Ready"**
   - ✅ Environment: **"Production"**
   - ✅ Domain: `www.driveinfrance.com`

### 12.3 Check SSL Certificate

1. Visit `https://www.driveinfrance.com`
2. Click the padlock icon in browser
3. Should show **"Connection is secure"**
4. Certificate should be issued by Let's Encrypt or Vercel

### 12.4 Performance Check

1. Run a speed test: https://pagespeed.web.dev
2. Check mobile responsiveness
3. Verify images are optimized

---

## Troubleshooting Common Issues

### Build Fails

**Error: "Cannot find module"**
- Solution: Check `package.json` - all dependencies should be listed
- Run `npm install` locally and commit `package-lock.json`

**Error: "Prisma Client not generated"**
- Solution: Verify `vercel.json` has `prisma generate` in build command
- Check that Prisma is in dependencies, not just devDependencies

**Error: "Database connection failed"**
- Solution: Verify `DATABASE_URL` is correct
- Check database is accessible (some providers need IP whitelisting)
- For Supabase: Make sure to use connection pooling URL

### Domain Not Working

**DNS not propagating:**
- Wait longer (up to 48 hours)
- Check DNS at: https://dnschecker.org
- Verify DNS records in GoDaddy match Vercel instructions exactly

**SSL certificate error:**
- Wait 10-15 minutes after DNS propagation
- Vercel auto-generates SSL certificates
- Check Vercel → Settings → Domains → SSL status

### Webhook Not Receiving Events

**Check webhook endpoint:**
- Verify URL in Stripe matches your domain exactly
- Make sure you're checking the **Live mode** webhook (not Test mode)

**Check webhook secret:**
- Verify `STRIPE_WEBHOOK_SECRET` in Vercel matches Stripe dashboard
- Redeploy after updating the secret

**Test webhook:**
- In Stripe Dashboard → Webhooks → Your webhook → "Send test webhook"
- Check Vercel function logs for errors

### Email Not Sending

**Check Resend:**
- Verify `RESEND_API_KEY` is correct in Vercel
- Check Resend dashboard for API usage/quota
- Check Resend logs for errors

**Check email address:**
- Verify `SUPPORT_EMAIL` is set correctly
- If using custom domain, make sure it's verified in Resend

### File Uploads Not Working

**Check Vercel Blob:**
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check Blob storage is created and active
- Check Vercel function logs for errors

---

## Next Steps After Successful Deployment

1. **Set up monitoring:**
   - Enable Vercel Analytics
   - Set up error tracking (Sentry, etc.)
   - Monitor database performance

2. **Set up backups:**
   - Configure database backups (Vercel Postgres has automatic backups)
   - Document backup restoration process

3. **Set up alerts:**
   - Configure email alerts for build failures
   - Set up monitoring for critical errors

4. **Documentation:**
   - Document admin access process
   - Create runbook for common issues

5. **Performance optimization:**
   - Monitor Core Web Vitals
   - Optimize images and assets
   - Set up CDN caching rules

---

## Quick Reference: Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Resend Dashboard:** https://resend.com/dashboard
- **GoDaddy:** https://godaddy.com
- **Your Site:** https://www.driveinfrance.com
- **GitHub Repo:** https://github.com/driveinfrance-bot/driveinfrancewebsite

---

## Need Help?

If you encounter issues not covered here:
1. Check Vercel deployment logs
2. Check Stripe webhook logs
3. Review error messages carefully
4. Check this guide's Troubleshooting section
5. Refer to official documentation:
   - Vercel Docs: https://vercel.com/docs
   - Stripe Docs: https://stripe.com/docs
   - Next.js Docs: https://nextjs.org/docs

Good luck with your deployment! 🚀
