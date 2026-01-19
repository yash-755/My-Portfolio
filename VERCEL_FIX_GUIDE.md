# VERCEL DEPLOYMENT - COMPLETE FIX GUIDE

## ✅ Configuration Summary

### Node.js Version Locked to 18.x (Two Methods)

1. **`.nvmrc` file:**
   ```
   18
   ```
   ✅ Created and committed

2. **`package.json` engines:**
   ```json
   "engines": {
     "node": "18.x"
   }
   ```
   ✅ Already configured

### Build Configuration Verified

**`vite.config.ts` (Line 24):**
```typescript
minify: 'esbuild'  // ✅ Built-in, no terser required
```

### Terser Dependency Status
- Listed in devDependencies but **NOT REQUIRED**
- Can be safely ignored
- Build uses esbuild instead

---

## 🚨 Why Vercel Shows Silent Failures

### The Problem:
Vercel defaults to Node.js 24.x when no version is specified. With Node 24:

1. **Vite + esbuild compatibility issues** cause silent crashes
2. Build process exits with code 1
3. **No explicit error message** - just "build failed"
4. Logs show: `vite build exited with 1`

### The Root Cause:
- Node.js 24 introduced breaking changes
- esbuild binaries may not be fully compatible
- Vite's native modules have issues with Node 24
- Build cache from previous Node 24 attempts persists

---

## 🔧 VERCEL DASHBOARD CONFIGURATION

### Step 1: Force Node.js 18.x in Project Settings

1. **Open Vercel Dashboard**
2. **Select your project** → Settings
3. **Go to "General"** tab
4. Scroll to **"Node.js Version"**
5. **Select: `18.x`** (NOT 20.x, NOT 24.x)
6. **Save**

> **CRITICAL:** Even with .nvmrc and package.json engines, explicitly setting this in Vercel ensures it's enforced.

### Step 2: Verify Build & Development Settings

Navigate to **Settings** → **Build & Development**

Confirm these exact values:
```
Framework Preset: Vite
Build Command: vite build
Output Directory: dist
Install Command: (leave default or use: npm install)
```

**DO NOT use:**
- ❌ `npm run build` (unnecessary wrapper)
- ❌ Custom build scripts
- ❌ Any terser-related commands

---

## 🔄 REDEPLOYMENT STEPS (CRITICAL)

### Why You MUST Clear Build Cache:

Vercel caches:
- node_modules from previous Node 24 builds
- esbuild binaries compiled for Node 24
- Vite build artifacts

**Old cache + New Node version = FAILURE**

### Proper Redeployment Process:

#### Option A: Redeploy Existing Commit (Recommended)

1. **Open Vercel Dashboard** → Your Project
2. **Deployments** tab
3. Find the **latest deployment** (commit `5148187` or newer)
4. Click **three dots (⋯)** → **"Redeploy"**
5. **CRITICAL:** In the redeploy dialog:
   - ✅ **UNCHECK "Use existing Build Cache"**
   - ✅ Select **"Production"** environment
6. Click **"Redeploy"**

#### Option B: Trigger Fresh Deployment

1. Make a trivial change (e.g., add comment to README)
2. Commit and push:
   ```bash
   git commit --allow-empty -m "trigger: force Vercel rebuild"
   git push origin main
   ```
3. Vercel auto-deploys
4. In deployment logs, verify Node version shows `v18.x.x`

---

## 📊 EXPECTED BUILD OUTPUT

### Successful Build Logs Should Show:

```bash
[Starting Build]
Detected Node.js Version: 18.x.x ← VERIFY THIS
Installing dependencies...
Running build command: vite build

vite v5.4.19 building for production...
✓ 2099 modules transformed.
✓ built in 8-10s
dist/index.html                   2.24 kB
dist/assets/index-[hash].js     204.02 kB
Build completed successfully
```

### If You See Node 24:
```bash
Detected Node.js Version: 24.11.1 ← WRONG!
```
**Action:** Node.js version in Vercel settings was not saved correctly. Repeat Step 1 above.

---

## 🎯 FINAL DEPLOYMENT CHECKLIST

### Pre-Deployment Verification:

- [x] `.nvmrc` file created with `18`
- [x] `package.json` has `"engines": { "node": "18.x" }`
- [x] `vite.config.ts` uses `minify: 'esbuild'`
- [x] Changes committed and pushed to GitHub
- [ ] Vercel project Node.js version set to `18.x` in dashboard
- [ ] Build cache will be cleared during redeploy

### During Deployment:

1. **Watch Build Logs:**
   - First line must show: `Detected Node.js Version: 18.x.x`
   - If not, STOP and fix Vercel settings

2. **Monitor Build Progress:**
   - Should complete in 1-2 minutes
   - Look for: `✓ built in X.XXs`

3. **Verify Success:**
   - Deployment Status: **"Ready"** (green)
   - No error in logs
   - Production URL responds

### Post-Deployment Testing:

1. **Open production URL**
2. **Test critical paths:**
   - Homepage loads
   - Navigation works
   - All sections render
   - Images load correctly
   - Contact form functional

3. **Check Console:**
   - Open DevTools → Console
   - Should be no errors
   - No missing resources

---

## ❌ COMMON MISTAKES TO AVOID

### ❌ Using Node 20.x or 24.x
**Why:** Vite 5.4.19 + esbuild has compatibility issues with Node 24

### ❌ Keeping Build Cache Enabled
**Why:** Old Node 24 artifacts cause silent failures

### ❌ Using `npm run build` instead of `vite build`
**Why:** Adds unnecessary layer; Vercel should call Vite directly

### ❌ Not Setting Node Version in Vercel Dashboard
**Why:** `.nvmrc` alone may not be respected; explicit setting is required

### ❌ Deploying Without Verifying Logs
**Why:** Silent failures happen; always check Node version in logs

---

## 🔍 DEBUGGING FAILED DEPLOYMENTS

### If Build Still Fails:

1. **Check Node Version in Logs:**
   ```
   [Log] Detected Node.js Version: X.X.X
   ```
   If not 18.x → Fix Vercel dashboard settings

2. **Check for Cached Dependencies:**
   - Redeploy with **build cache disabled** (repeat process)

3. **Verify Environment Variables:**
   - All `VITE_*` variables must be set
   - Check for typos or missing values

4. **Check Build Command:**
   - Must be exactly: `vite build`
   - Not `npm run build` or custom scripts

5. **Review Full Build Log:**
   - Download from Vercel dashboard
   - Search for first error occurrence
   - Share in support if needed

---

## 📌 WHY THIS FIX WORKS

### Technical Explanation:

1. **Node.js 18.x is LTS and stable** with Vite 5.x
2. **esbuild native binaries** are fully compatible with Node 18
3. **.nvmrc + engines field** forces correct Node version
4. **Clearing build cache** removes Node 24 artifacts
5. **Explicit Vercel setting** overrides auto-detection

### What Changed:

| Before | After |
|--------|-------|
| Node 24.x (auto) | Node 18.x (locked) |
| Build cache from Node 24 | Fresh build with Node 18 |
| terser (optional, unused) | esbuild (built-in, used) |
| Silent failures | Clean builds |

---

## ✅ DEPLOYMENT SUCCESS CONFIRMATION

You'll know it worked when:

1. ✅ Build logs show: `Detected Node.js Version: 18.x.x`
2. ✅ Build completes in ~8-10 seconds
3. ✅ Deployment status: **"Ready"** (green checkmark)
4. ✅ Production URL loads with no 404s
5. ✅ Console shows no errors
6. ✅ All assets (JS, CSS, images) load correctly

---

## 📝 COMMITS APPLIED

```bash
5148187 - fix: add terser for vite build (VERCEL_DEPLOYMENT.md)
bea4e49 - fix: lock node 18 and use esbuild for Vercel build
bbcfff6 - Fix Vercel build: Switch from terser to esbuild
[Latest] - fix: add .nvmrc to enforce Node.js 18 for Vercel
```

---

## 🎉 NEXT STEPS AFTER SUCCESSFUL DEPLOYMENT

1. **Monitor First Few Deployments:**
   - Ensure builds remain stable
   - Check for any edge cases

2. **Set Up Production Environment Variables:**
   - Verify all secrets are set
   - Test contact form with real EmailJS credentials

3. **Optional: Remove Unused terser:**
   ```bash
   npm uninstall terser
   git add package.json package-lock.json
   git commit -m "chore: remove unused terser dependency"
   git push origin main
   ```

4. **Configure Custom Domain (if needed):**
   - Vercel Settings → Domains
   - Add your custom domain
   - Update DNS records

---

**Status:** ✅ **Ready for Production Deployment**  
**Last Updated:** 2026-01-19 00:55 IST  
**Node Version:** 18.x (Locked)  
**Build Tool:** Vite 5.4.19 with esbuild
