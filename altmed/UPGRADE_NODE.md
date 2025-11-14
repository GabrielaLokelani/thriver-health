# Upgrade Node.js for Amplify Gen 2

## Current Issue
Your Node.js version (v18.15.0) is too old. Amplify Gen 2 requires:
- Node.js 18.19.0+ OR
- Node.js 20.6.0+ OR  
- Node.js 22+

## Solution: Install nvm (Node Version Manager)

### Step 1: Install nvm

Run this in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Step 2: Reload your shell

```bash
source ~/.zshrc
```

Or close and reopen your terminal.

### Step 3: Install Node.js 20 (LTS - Recommended)

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### Step 4: Verify

```bash
node --version
```

Should show: `v20.x.x` or higher

### Step 5: Reinstall npm packages (optional but recommended)

```bash
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
rm -rf node_modules package-lock.json
npm install
```

### Step 6: Run sandbox again

```bash
npm run sandbox
```

---

## Alternative: Use Homebrew (if you have it)

```bash
brew install node@20
brew link node@20
```

Then verify:
```bash
node --version
```

---

## Alternative: Download from nodejs.org

1. Go to https://nodejs.org/
2. Download Node.js 20 LTS (macOS installer)
3. Run the installer
4. Restart terminal
5. Verify: `node --version`

---

## After Upgrading

Once Node is upgraded, run:

```bash
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
npm run sandbox
```

The sandbox should now work! 🚀

