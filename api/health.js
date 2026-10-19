/**
 * Vercel Serverless Function: /api/health
 */

export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ai: process.env.GEMINI_API_KEY ? 'configured' : 'not configured',
  });
}
