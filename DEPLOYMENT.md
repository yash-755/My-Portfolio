# Deployment Guide

Complete guide for deploying the Yash Uttam Portfolio to production on Vercel, Netlify, or GitHub Pages.

## Prerequisites

- Node.js 18+ installed
- Git repository
- Account on Vercel, Netlify, or GitHub (depending on deployment platform)

---

## Environment Variables Setup

### 1. Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`:

**Required Variables:**
- `GROK_API_KEY` - Get from https://console.x.ai/
- `VITE_EMAILJS_SERVICE_ID` - From EmailJS dashboard
- `VITE_EMAILJS_TEMPLATE_ID` - From EmailJS dashboard
- `VITE_EMAILJS_PUBLIC_KEY` - From EmailJS account settings

**Optional Variables:**
- `VITE_BASE_URL=/` - Base path for deployment (default: `/`)
- `NODE_ENV=production` - Environment mode
- `PORT=3001` - Backend server port

3. **NEVER commit the `.env` file** - It's already in `.gitignore`

### 2. EmailJS Setup

1. Sign up at https://www.emailjs.com/
2. Create an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
4. Get Public Key from Account settings
5. Add all credentials to your `.env` file

---

## Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Import Project in Vercel:**
   - Go to https://vercel.com/new
   - Select your repository
   - Click "Import"

3. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables:**
   Go to Project Settings → Environment Variables and add:
   ```
   GROK_API_KEY=your_actual_key_here
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_BASE_URL=/
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - Get your production URL (e.g., `your-portfolio.vercel.app`)

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Netlify Deployment

### Manual Deployment

1. **Push to GitHub** (same as above)

2. **Import Project in Netlify:**
   - Go to https://app.netlify.com/start
   - Click "Import an existing project"
   - Connect to your Git provider
   - Select your repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)

4. **Add Environment Variables:**
   Go to Site Settings → Environment Variables and add:
   ```
   GROK_API_KEY=your_actual_key_here
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_BASE_URL=/
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy
   - Get your production URL (e.g., `your-portfolio.netlify.app`)

### Netlify CLI Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

---

## GitHub Pages Deployment

**Note:** GitHub Pages is for static sites only. The Robo chat backend won't work, but the rest of the portfolio will.

### Setup

1. **Update vite.config.ts base path:**

   If your repo is `https://github.com/username/portfolio`, set:
   ```typescript
   base: '/portfolio/'
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Save

Your site will be available at `https://username.github.io/repository-name/`

---

## Build Verification

Before deploying, always verify the production build locally:

### 1. Type Check
```bash
npm run type-check
```
Should complete without TypeScript errors.

### 2. Build
```bash
npm run build
```
Should complete without errors. Output will be in `dist/` folder.

### 3. Preview Production Build
```bash
npm run preview
```
Opens production build at http://localhost:4173

### 4. Combined Check
```bash
npm run build:check
```
Builds and previews in one command.

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly at production URL
- [ ] No console errors in browser
- [ ] All sections display properly
- [ ] Contact form works (sends emails)
- [ ] All links work correctly
- [ ] Favicon displays
- [ ] Meta tags appear in page source (View Source)
- [ ] Social preview works (share on Twitter/Facebook to test)
- [ ] Responsive design works on mobile
- [ ] All images load correctly

---

## Troubleshooting

### Build Fails

**Issue:** TypeScript errors
```bash
npm run type-check
```
Fix any TypeScript errors shown.

**Issue:** Missing dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Issue:** Variables undefined in production

**Solution:**
1. Ensure variables start with `VITE_` for client-side access
2. Verify variables are set in deployment platform dashboard
3. Redeploy after adding variables
4. Check build logs for errors

### 404 on Page Refresh

**Issue:** Getting 404 when refreshing on routes like `/about`

**Solution for Netlify:**
Create `public/_redirects`:
```
/*    /index.html   200
```

**Solution for Vercel:**
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Images Not Loading

**Issue:** Images show broken links

**Solution:**
1. Ensure images are in `public/` folder
2. Reference with absolute paths: `/image.jpg`
3. Check image paths in build output
4. Verify `base` URL in vite.config.ts

---

## Continuous Deployment

Once set up, both Vercel and Netlify support automatic deployments:

1. **Push to main branch:**
   ```bash
   git push origin main
   ```

2. **Automatic build & deploy:**
   - Vercel/Netlify detects the push
   - Runs build automatically
   - Deploys if build succeeds
   - Sends notification with deployment URL

---

## Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (can take 24-48 hours)

### Netlify

1. Go to Site Settings → Domain management
2. Add custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic with Let's Encrypt)

---

## Performance Monitoring

After deployment, monitor performance with:

1. **Google PageSpeed Insights:** https://pagespeed.web.dev/
2. **Lighthouse** (in Chrome DevTools)
3. **Vercel Analytics** (if using Vercel)
4. **Netlify Analytics** (if using Netlify)

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## Security Best Practices

✅ **Implemented:**
- `.env` file ignored by Git
- Only placeholder values in `.env.example`
- Environment variables properly scoped (`VITE_` prefix)
- No secrets in codebase

⚠️ **Remember:**
- Never commit `.env` file
- Rotate API keys if accidentally exposed
- Use environment variables for all secrets
- Enable HTTPS on custom domain

---

## Support

If you encounter issues:

1. Check build logs in deployment platform
2. Test production build locally: `npm run preview`
3. Verify environment variables are set correctly
4. Check deployment platform documentation:
   - Vercel: https://vercel.com/docs
   - Netlify: https://docs.netlify.com
   - GitHub Pages: https://docs.github.com/pages

---

## Quick Reference

```bash
# Local development
npm run dev                    # Start dev server

# Production build
npm run build                  # Build for production
npm run preview                # Preview production build
npm run build:check            # Build and preview
npm run type-check             # Check TypeScript

# Deployment
vercel --prod                  # Deploy to Vercel
netlify deploy --prod          # Deploy to Netlify
npm run deploy                 # Deploy to GitHub Pages
```

---

**Last Updated:** January 2026
**Portfolio Version:** 1.0.0
