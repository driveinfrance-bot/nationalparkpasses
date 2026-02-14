#!/usr/bin/env node

/**
 * Script to check if all required environment variables are set
 * Run this before deploying to verify configuration
 */

const requiredEnvVars = {
  production: [
    'STRIPE_SECRET_KEY',
    'STRIPE_PRICE_ID',
    'BASE_URL',
    'STRIPE_WEBHOOK_SECRET',
    'DATABASE_URL',
    'BLOB_READ_WRITE_TOKEN',
  ],
  development: [
    'DATABASE_URL', // Can be SQLite or Postgres
  ],
};

const env = process.env.NODE_ENV || 'development';
const vars = requiredEnvVars[env] || requiredEnvVars.development;

console.log(`\n🔍 Checking environment variables for: ${env}\n`);

let allPresent = true;
const missing = [];
const present = [];

vars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    present.push(varName);
    // Mask sensitive values
    const masked = varName.includes('SECRET') || varName.includes('KEY') || varName.includes('TOKEN')
      ? `${value.substring(0, 8)}...`
      : value;
    console.log(`✅ ${varName}: ${masked}`);
  } else {
    missing.push(varName);
    console.log(`❌ ${varName}: NOT SET`);
    allPresent = false;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Present: ${present.length}/${vars.length}`);
console.log(`   Missing: ${missing.length}/${vars.length}`);

if (missing.length > 0) {
  console.log(`\n⚠️  Missing variables:`);
  missing.forEach((v) => console.log(`   - ${v}`));
  console.log(`\n💡 Set these in Vercel Dashboard → Settings → Environment Variables`);
  process.exit(1);
} else {
  console.log(`\n✅ All required environment variables are set!\n`);
  process.exit(0);
}
