# Robo Chat - Setup Instructions

## Quick Start

The Robo chat has been upgraded to use the Grok API for intelligent responses about Yash's portfolio.

### Prerequisites

1. **Get a Grok API Key**
   - Visit [https://console.x.ai/](https://console.x.ai/)
   - Sign up or log in
   - Generate an API key

2. **Configure Environment Variables**
   - Create a `.env` file in the project root (copy from `.env.example`):
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and replace `your_grok_api_key_here` with your actual API key:
     ```
     GROK_API_KEY=xai-your-actual-key-here
     ```

### Running the Application

Simply run:
```bash
npm run dev
```

This will start both:
- ✅ Vite dev server (frontend) on `http://localhost:8080`
- ✅ Express backend server (API) on `http://localhost:3001`

### Testing the Chat

1. Open `http://localhost:8080` in your browser
2. Click the floating Robo button in the bottom-right
3. Test with questions like:
   - "What are Yash's skills?"
   - "Tell me about his projects"
   - "What certifications does Yash have?"
   - "How can I contact Yash?"

### Architecture

```
Frontend (React + Vite)
    ↓
/api/chat endpoint
    ↓
Express Backend Server
    ↓
Grok API (grok-2-1212)
```

**Security**: The API key is stored server-side only. The frontend never sees or sends the API key.

### Troubleshooting

**"I'm having trouble connecting right now"**
- Make sure both servers are running (look for two processes in terminal)
- Check that port 3001 is not in use by another application
- Verify your `.env` file exists and contains a valid `GROK_API_KEY`

**Backend server won't start**
- Check that you've run `npm install` after pulling the latest changes
- Ensure Node.js version is 18+ (`node --version`)

**API errors**
- Verify your Grok API key is valid
- Check the backend console logs for detailed error messages
