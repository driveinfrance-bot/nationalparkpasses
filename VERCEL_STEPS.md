# Vercel Deployment Steps (Tally Apply Form)

Use this checklist for Vercel-only setup when enabling the Tally apply flow.

## 1) Add Environment Variables

In **Vercel → Project → Settings → Environment Variables**, add:

```
NEXT_PUBLIC_TALLY_FORM_ID=<your-tally-form-id>
TALLY_WEBHOOK_SECRET=<optional-webhook-signing-secret>
```

Keep your existing Stripe, database, and storage variables unchanged.

## 2) Run the Prisma Migration

From your local machine (after linking the project with Vercel CLI):

```bash
npx prisma migrate deploy
```

This ensures the new `Order.tallyResponseId` column exists in production.

## 3) Deploy

Trigger a new deployment (push to GitHub or redeploy from the Vercel UI).

## 4) Configure Tally

In your Tally form settings:

- **Webhook URL**
  ```
  https://www.driveinfrance.com/api/webhooks/tally
  ```
- **Thank-you redirect**
  ```
  https://www.driveinfrance.com/pay?respondentId=@Respondent ID

  If your Tally workspace supports moustache variables, this also works:
  https://www.driveinfrance.com/pay?response_id={{response_id}}
  ```

## 5) Verify

1. Submit a test form in Tally.
2. Confirm you are redirected to `/pay`.
3. Confirm Stripe checkout is reachable and payment completes.
