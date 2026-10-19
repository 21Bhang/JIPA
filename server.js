/**
 * JIPA South Sudan — Express Backend Server
 * Provides API endpoints for Gemini AI chat and data persistence.
 */

import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '2mb' }));

// ── Serve built frontend assets ──────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

// ── Gemini AI Chat endpoint ───────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

/**
 * POST /api/chat
 * Body: { message: string, context: string, history: ChatMessage[] }
 * Returns: { reply: string }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    // Build conversation history for Gemini
    const formattedHistory = (/** @type {any[]} */ (history))
      .filter((m) => m.role === 'user' || m.role === 'model')
      .map((m) => ({
        role: /** @type {'user' | 'model'} */ (m.role),
        parts: m.parts,
      }));

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: context,
        maxOutputTokens: 400,
        temperature: 0.6,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message });
    const reply = response.text ?? 'I could not generate a response. Please try again.';

    return res.json({ reply });
  } catch (err) {
    console.error('[/api/chat] Error:', err);
    return res.status(500).json({ error: 'Internal server error', reply: 'Sorry, I encountered an error. Please try again.' });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ai: process.env.GEMINI_API_KEY ? 'configured' : 'not configured',
  });
});

// ── SPA fallback — serve index.html for all unmatched routes ─────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`JIPA server running on http://0.0.0.0:${PORT}`);
  console.log(`Gemini AI: ${process.env.GEMINI_API_KEY ? '✓ configured' : '✗ not configured (set GEMINI_API_KEY)'}`);
});
