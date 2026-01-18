import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPortfolioContext } from './portfolio-context.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files in production
if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Robo backend is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get API key from environment
        const apiKey = process.env.GROK_API_KEY;
        if (!apiKey) {
            console.error('GROK_API_KEY is not set in environment variables');
            return res.status(500).json({
                error: 'Server configuration error. Please contact the administrator.'
            });
        }

        // Get portfolio context
        const portfolioContext = getPortfolioContext();

        // Build system prompt with portfolio context - STRICT SCOPE LIMITATION
        const systemPrompt = `You are Robo, a specialized virtual assistant EXCLUSIVELY for Yash Uttam's portfolio website.

CRITICAL RULES - YOU MUST FOLLOW THESE STRICTLY:
1. You can ONLY answer questions about Yash Uttam based on the portfolio context below
2. You MUST NOT answer general knowledge questions, world events, or topics unrelated to Yash
3. You MUST NOT hallucinate or make up information not present in the context
4. If the user asks about something not in the portfolio context, you MUST respond with: "I can only answer questions related to Yash's portfolio. Please ask me about his skills, projects, certifications, experience, or hobbies."

PORTFOLIO CONTEXT (THIS IS YOUR ONLY KNOWLEDGE BASE):
${portfolioContext}

RESPONSE GUIDELINES:
- Answer questions ONLY using information from the portfolio context above
- Be concise, friendly, and professional
- Keep responses under 150 words when possible
- If asked about Yash's skills, projects, certifications, hobbies, or experience - answer from the context
- If asked about anything else (e.g., "Who is Elon Musk?", "What is Python?", "Tell me a joke") - use the refusal message
- Stay in character as Yash's portfolio assistant

FOLLOW-UP SUGGESTIONS (IMPORTANT):
After answering a valid portfolio question, you MUST suggest 2-3 related topics the user can ask about next. 
- Suggestions must be based on the portfolio context only
- Make them relevant to what the user just asked about
- Format as a brief line after your answer, like: "You might also want to know about: [topic 1], [topic 2], or [topic 3]"
- Choose from: skills, projects, certifications, hobbies, contact info, specific technologies

SUGGESTION EXAMPLES:
- If asked about a project → suggest related skills, technologies used, or other projects
- If asked about skills → suggest projects that use those skills, or related certifications
- If asked about certifications → suggest related skills or projects
- If asked about hobbies → suggest related skills or projects
- Always provide relevant, contextual suggestions based on what was asked

RESPONSE FORMAT:
[Your answer to the question]

You might also want to know about: [suggestion 1], [suggestion 2], or [suggestion 3]

EXAMPLES OF VALID QUESTIONS:
- "What are Yash's skills?"
- "Tell me about his projects"
- "Which certifications does he have?"
- "What are his hobbies?"
- "How can I contact Yash?"

EXAMPLES OF INVALID QUESTIONS (respond with refusal):
- "Who is Elon Musk?" → REFUSE
- "What is machine learning?" → REFUSE (unless asking about YASH's ML skills)
- "Tell me a joke" → REFUSE
- "What's the weather?" → REFUSE`;

        // Call Grok API
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                model: 'grok-2-1212',
                temperature: 0.2,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Grok API error:', response.status, errorData);
            return res.status(500).json({
                error: 'Failed to get response from AI assistant. Please try again.'
            });
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content;

        if (!assistantMessage) {
            console.error('No message in Grok response:', data);
            return res.status(500).json({
                error: 'Received invalid response from AI assistant.'
            });
        }

        // Return the response
        res.json({ message: assistantMessage });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
    }
});

// Serve index.html for all other routes in production (SPA support)
if (NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`🤖 Robo backend server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);

    if (!process.env.GROK_API_KEY) {
        console.warn('⚠️  WARNING: GROK_API_KEY is not set!');
        console.warn('   Please create a .env file with your Grok API key');
    }
});
