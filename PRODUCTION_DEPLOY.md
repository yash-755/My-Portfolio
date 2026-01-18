# Production Deployment Guide - Robo Chat

## Overview

This guide explains how to deploy the Grok-powered Robo chat to production environments.

## Architecture

In production, the Express backend serves both:
1. **API endpoints** (`/api/chat`, `/api/health`)
2. **Static frontend files** (built React app from `/dist`)

This single-server architecture simplifies deployment.

---

## Prerequisites

1. **Node.js** 18+ installed on production server
2. **Grok API Key** from https://console.x.ai/
3. Production server with ports available (default: 3001 or custom)

---

## Deployment Steps

### 1. Build the Frontend

```bash
npm run build
```

This creates an optimized production bundle in `/dist` directory.

**Expected output:**
```
✓ 2079 modules transformed
✓ built in ~7s
```

### 2. Set Environment Variables

Create a `.env` file in production:

```bash
GROK_API_KEY=xai-your-actual-production-key
NODE_ENV=production
PORT=3001
```

**Important:**
- Never commit `.env` to version control
- Use your production hosting provider's environment variable system when possible
- `NODE_ENV=production` enables static file serving

### 3. Start Production Server

```bash
npm run start
```

**Or manually:**
```bash
NODE_ENV=production node server/index.js
```

**Expected output:**
```
🤖 Robo backend server running on http://localhost:3001
📡 API endpoint: http://localhost:3001/api/chat
```

### 4. Access the Application

Navigate to: `http://your-server:3001`

The Express server will:
- Serve the React app from `/dist`
- Handle API requests at `/api/*`
- Support SPA routing (catch-all route)

---

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `GROK_API_KEY` | API key from X.AI | `xai-abc123...` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |

---

## Production Checklist

### Before Deployment
- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run preview:prod`
- [ ] Verify Robo chat works in production mode
- [ ] Confirm no console errors in browser
- [ ] Set `GROK_API_KEY` in production environment
- [ ] Set `NODE_ENV=production`

### Security
- [ ] `.env` not committed to git (check `.gitignore`)
- [ ] API key stored securely (environment variables)
- [ ] CORS configured appropriately for production domain
- [ ] HTTPS enabled on production server

### Testing
- [ ] Chat responds correctly
- [ ] Follow-up suggestions appear
- [ ] Refusal message works for off-topic questions
- [ ] No 404 errors in console
- [ ] Static assets load correctly

---

## Hosting Provider Examples

### Vercel / Netlify

These platforms typically run only frontend. For full-stack with backend:

**Option 1: Separate deployment**
- Deploy frontend to Vercel/Netlify
- Deploy backend to Render/Railway/Heroku
- Update frontend API calls to point to backend URL

**Option 2: Use provider with backend support**
- Use Vercel with serverless functions
- Use Render for full-stack deployment

### Render

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start`
5. Add environment variable: `GROK_API_KEY`
6. Add environment variable: `NODE_ENV=production`

### Railway

1. Create new project
2. Connect GitHub repository
3. Railway auto-detects Node.js
4. Set environment variables in dashboard:
   - `GROK_API_KEY`
   - `NODE_ENV=production`
5. Deploy

### Heroku

1. Create Heroku app
2. Add `GROK_API_KEY` config var
3. Push to Heroku:
   ```bash
   git push heroku main
   ```
4. Heroku automatically runs `npm run build` and `npm start`

---

## Testing Production Build Locally

### Method 1: Using npm script
```bash
npm run preview:prod
```

This builds and starts the production server.

### Method 2: Manual steps
```bash
# Build frontend
npm run build

# Start production server
npm run start
```

Then visit `http://localhost:3001`

---

## Troubleshooting

### Build Fails

**Error:** `vite build` fails

**Solutions:**
1. Check TypeScript errors: `npm run lint`
2. Ensure all dependencies installed: `npm install`
3. Clear cache: `rm -rf node_modules dist && npm install`

### Chat Not Working in Production

**Symptoms:** "I'm having trouble connecting right now"

**Check:**
1. Environment variables set correctly:
   ```bash
   echo $GROK_API_KEY  # Should show your key
   echo $NODE_ENV      # Should show 'production'
   ```
2. Backend server running and accessible
3. Check server logs for errors
4. Verify `/api/health` endpoint responds:
   ```bash
   curl http://localhost:3001/api/health
   # Should return: {"status":"ok","message":"Robo backend is running"}
   ```

### 404 Errors for Routes

**Cause:** SPA routing not working

**Solution:** Ensure catch-all route in `server/index.js`:
```javascript
if (NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}
```

### Static Files Not Loading

**Symptoms:** Blank page, missing CSS/JS

**Check:**
1. `/dist` directory exists and contains files
2. Static file middleware enabled:
   ```javascript
   if (NODE_ENV === 'production') {
       app.use(express.static(path.join(__dirname, '../dist')));
   }
   ```
3. Server logs show file requests
4. Browser console for 404 errors

### CORS Issues

**Error:** "CORS policy" in browser console

**Solution:** Update CORS settings in `server/index.js`:
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
```

---

## Monitoring Production

### Health Check

Monitor using the health endpoint:
```bash
curl http://your-server:3001/api/health
```

**Expected response:**
```json
{"status":"ok","message":"Robo backend is running"}
```

### Logging

Server logs important events:
- Server startup
- Missing `GROK_API_KEY` warning
- API errors
- Chat request errors

**Example logs:**
```
🤖 Robo backend server running on http://localhost:3001
📡 API endpoint: http://localhost:3001/api/chat
⚠️  WARNING: GROK_API_KEY is not set!  # If missing
```

---

## Scaling Considerations

### Single Server Limitations
- One process handles all requests
- No horizontal scaling built-in

### Recommendations for High Traffic
1. Use process manager (PM2) for clustering
2. Deploy behind load balancer
3. Consider serverless functions for `/api/chat`
4. Implement rate limiting
5. Add caching for common queries

---

## Security Best Practices

1. **Never expose API key in frontend**
   - ✅ Backend reads from environment
   - ✅ Frontend calls backend API only

2. **Use HTTPS in production**
   - Most hosting providers auto-provision SSL
   - Ensure `GROK_API_KEY` transmitted securely

3. **Implement rate limiting**
   - Consider `express-rate-limit` middleware
   - Prevent API abuse

4. **Monitor API usage**
   - Track Grok API calls
   - Set up alerts for unusual patterns

5. **Update dependencies regularly**
   - Run `npm audit` periodically
   - Fix security vulnerabilities

---

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to Render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
        run: |
          # Deploy commands here
```

---

## Cost Optimization

### Grok API Costs
- Monitor token usage
- Set `max_tokens: 500` (already done)
- Temperature `0.2` reduces unpredictability
- Consider implementing user session limits

### Server Costs
- Use free tier hosting (Render, Railway) for low traffic
- Scale up as needed
- Monitor resource usage

---

## Rollback Strategy

If deployment fails:

1. **Revert to previous build:**
   ```bash
   git revert HEAD
   npm run build
   npm run start
   ```

2. **Use previous environment variables**
   - Keep backup of working `.env`

3. **Check deployment logs**
   - Identify what changed
   - Fix and redeploy

---

## Summary

**Production deployment is straightforward:**
1. `npm run build` → generates `/dist`
2. Set `GROK_API_KEY` and `NODE_ENV=production`
3. `npm run start` → serves app + API
4. Access at your server URL

**Key Points:**
- Single server serves both frontend and API
- Environment variables control behavior
- No code changes needed for production
- Static files served from `/dist`
- API endpoints continue working at `/api/*`

**Ready for production!** 🚀
