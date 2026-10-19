/**
 * Vercel Serverless Function: /api/chat
 * Proxies messages to Gemini 2.0 Flash for the JIPA AI Assistant.
 */

import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, context, history = [] } = req.body ?? {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      error: 'AI service not configured',
      reply: 'The AI assistant is not configured yet. Please contact JIPA at info@jipasouthsudan.org',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const formattedHistory = (history)
      .filter((m) => m.role === 'user' || m.role === 'model')
      .map((m) => ({ role: m.role, parts: m.parts }));

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

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('[/api/chat] Error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      reply: 'Sorry, I encountered an error. Please try again.',
    });
  }
}
