# Push Code to GitHub

Your code is ready to push, but you need to authenticate with GitHub first.

## Option 1: Use GitHub CLI (Recommended - Easiest)

If you have GitHub CLI installed:

```bash
gh auth login
```

Then push:
```bash
git push -u origin main
```

## Option 2: Use Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` scope
3. When pushing, use the token as the password:

```bash
git push -u origin main
# Username: driveinfrance-bot (or your GitHub username)
# Password: <paste your personal access token>
```

## Option 3: Set Up SSH Keys

1. Generate SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add SSH key to GitHub:
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste your public key

3. Change remote to SSH:
   ```bash
   git remote set-url origin git@github.com:driveinfrance-bot/driveinfrancewebsite.git
   ```

4. Push:
   ```bash
   git push -u origin main
   ```

## Quick Push (After Authentication)

Once authenticated, simply run:

```bash
git push -u origin main
```

Your repository is already configured at:
`https://github.com/driveinfrance-bot/driveinfrancewebsite.git`
