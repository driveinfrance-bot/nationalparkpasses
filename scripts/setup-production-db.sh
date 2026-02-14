#!/bin/bash

# Script to help set up production database migrations
# Run this after setting DATABASE_URL in Vercel

set -e

echo "🚀 Setting up production database..."
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL is not set"
  echo ""
  echo "Please set DATABASE_URL in your environment:"
  echo "  export DATABASE_URL='postgresql://user:password@host:port/database'"
  echo ""
  echo "Or in Vercel Dashboard → Settings → Environment Variables"
  exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo ""
echo "✅ Production database setup complete!"
echo ""
echo "Next steps:"
echo "  1. Verify your database schema in your database provider's dashboard"
echo "  2. Test your application"
echo ""
