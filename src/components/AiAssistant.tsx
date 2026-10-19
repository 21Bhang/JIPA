import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Bot, X, Send, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const STARTER_QUESTIONS = [
  'What is JIPA?',
  'How can I join JIPA?',
  'What are JIPA\'s top priorities?',
  'How do I report an atrocity?',
  'Who are the JIPA candidates?',
];

export const AiAssistant: React.FC = () => {
  const { siteSettings, counties, news, candidates, priorities } = useData();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Salaam! I am the JIPA AI Assistant. I can answer questions about JIPA, our candidates, the nine counties of Jonglei, our priorities, and how to get involved. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const buildContext = () => {
    const topCandidates = candidates
      .slice(0, 5)
      .map((c) => `${c.name} (${c.office}, ${c.county})`)
      .join('; ');
    const topPriorities = priorities
      .slice(0, 5)
      .map((p) => p.title)
      .join(', ');
    const countyNames = counties.map((c) => c.name).join(', ');
    const latestNews = news
      .slice(0, 3)
      .map((n) => n.title)
      .join('; ');

    return `You are the official AI assistant for JIPA (Jonglei Independent Political Alliance), a political movement in South Sudan. 
Website: ${siteSettings.domain}. Email: ${siteSettings.email}. WhatsApp: ${siteSettings.whatsappNumber}.
JIPA's slogan is "POWER TO THE PEOPLE". 
JIPA covers nine counties: ${countyNames}.
Key candidates: ${topCandidates}.
Top priorities include: ${topPriorities}.
Recent news: ${latestNews}.
JIPA is a grassroots, independent political movement. It is non-partisan and committed to peace, accountability, and development.
To join, visit the Join JIPA page or contact via WhatsApp. To report atrocities confidentially, use the Report Atrocities page.
The PAC (Political Action Committee) is JIPA's highest governing body with 180 delegates (20 per county).
Respond in a helpful, warm, concise manner. Stick to JIPA-related topics. If asked about unrelated topics, politely redirect.
If asked in Arabic, respond in Arabic. Otherwise respond in English.`;
  };

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || isLoading) return;

    const userMsg: Message = { role: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          context: buildContext(),
          history: messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const assistantMsg: Message = { role: 'assistant', text: data.reply ?? 'Sorry, I could not process your request.' };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Fallback: simple keyword-based responses when API is unavailable
      const lower = userText.toLowerCase();
      let reply = 'I\'m unable to connect to the AI server right now. Please try again later, or contact JIPA directly at ' + siteSettings.email;
      if (lower.includes('join') || lower.includes('member')) {
        reply = 'To join JIPA, visit the "Join JIPA" page on this website and complete the registration form. You can also reach us on WhatsApp at ' + siteSettings.whatsappNumber;
      } else if (lower.includes('candidate')) {
        reply = 'JIPA has endorsed independent candidates across all 9 counties. Visit the Candidates page to see the full list, including gubernatorial, national parliamentary, and local candidates.';
      } else if (lower.includes('priority') || lower.includes('priorities')) {
        reply = 'JIPA has 20 core priorities covering Peace & Security, Infrastructure, Healthcare, Education, Agriculture, Livestock, Fisheries, Flood Management, and Accountable Governance.';
      } else if (lower.includes('county') || lower.includes('counties')) {
        reply = 'JIPA operates across all 9 counties of Jonglei State: Bor, Twic East, Duk, Akobo, Nyirol, Uror, Ayod, Pigi, and Fangak.';
      } else if (lower.includes('report') || lower.includes('atrocit')) {
        reply = 'To report atrocities confidentially, visit the "Report Atrocities" page. Your report is protected with a unique tracking code and stored securely.';
      } else if (lower.includes('pac') || lower.includes('committee')) {
        reply = 'The PAC (Political Action Committee) is JIPA\'s highest governing body. It has 180 delegates — 20 from each of the 9 counties — plus a 15-member Executive Committee and 10 Standing Subcommittees.';
      }
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="fixed bottom-[max(1rem,calc(4.5rem+env(safe-area-inset-bottom,0px)))] left-3 sm:bottom-24 sm:left-6 z-40 flex flex-col items-start"
      aria-live="polite"
    >
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] sm:w-[360px] bg-[#111111] border border-[#FFD700]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: 'min(520px, calc(100vh - 180px))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-3 border-b border-[#FFD700]/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center border border-[#FFD700]/30">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
              </div>
              <div>
                <p className="text-xs font-black text-white">JIPA AI Assistant</p>
                <p className="text-[10px] text-[#999999]">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#999999] hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close AI assistant"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-[#FFD700]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#FFD700] text-[#0a0a0a] font-semibold rounded-br-sm'
                      : 'bg-[#222222] text-[#dddddd] rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 flex items-center justify-center shrink-0">
                  <Loader2 className="w-3 h-3 text-[#FFD700] animate-spin" />
                </div>
                <div className="bg-[#222222] px-3 py-2 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#888888] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#888888] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#888888] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter questions (only shown when only 1 message) */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[10px] font-semibold text-[#FFD700] border border-[#FFD700]/30 px-2 py-1 rounded-lg hover:bg-[#FFD700]/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-[#222222] flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about JIPA..."
              className="flex-1 bg-[#222222] text-white text-xs px-3 py-2 rounded-xl border border-[#444444] focus:outline-none focus:border-[#FFD700]/60 placeholder-[#888888]"
              disabled={isLoading}
              aria-label="Type your question"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-xl bg-[#FFD700] hover:bg-[#FFE44D] text-[#0a0a0a] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 ${
          isOpen
            ? 'bg-[#222222] border border-[#FFD700]/40 text-[#FFD700]'
            : 'bg-gradient-to-br from-[#FFD700] to-[#E6C200] text-[#0a0a0a] hover:from-[#FFE44D] hover:to-[#FFD700]'
        }`}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#111111] flex items-center justify-center">
            <span className="text-[7px] text-white font-black">AI</span>
          </span>
        )}
      </button>
    </div>
  );
};
