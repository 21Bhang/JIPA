import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MessageCircle, X, Send, ShieldCheck } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { siteSettings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Clean phone number for WhatsApp link
  const rawNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
  const defaultText = encodeURIComponent(
    customMsg.trim() || siteSettings.whatsappMessageDefault || 'Hello JIPA, I want to inquire about the alliance in Jonglei State.'
  );

  const waLink = `https://wa.me/${rawNumber}?text=${defaultText}`;

  return (
    <div className="fixed bottom-[max(1rem,calc(0.75rem+env(safe-area-inset-bottom,0px)))] right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Popup Card (Responsive on all screen sizes) */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] max-w-sm sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#dddddd] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] flex items-center justify-center font-bold text-white shadow-inner">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">JIPA Official WhatsApp</h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>Active Secretariat Desk</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 sm:p-4 bg-[#ECE5DD]/40 text-xs space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#dddddd]/60 text-[#222222] space-y-1">
              <p className="font-semibold text-[#111111] text-[11px] sm:text-xs">
                Welcome to Jonglei Independent Political Alliance!
              </p>
              <p className="text-[#666666] leading-relaxed text-[11px]">
                Connect directly with our central coordination desk for inquiries, membership, or candidate information across all nine counties.
              </p>
              <div className="text-[10px] text-[#996600] font-bold pt-1 flex items-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CC9900] shrink-0 mt-0.5" />
                <span>Confidential abuse reports must be made via the secure Report Portal, not WhatsApp.</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#444444] mb-1">
                Your message to JIPA:
              </label>
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your question or county..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-[#bbbbbb] focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-colors text-xs"
            >
              <Send className="w-4 h-4" />
              <span>Start WhatsApp Chat ({siteSettings.whatsappNumber})</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group border-2 border-white"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" />
        <span className="sr-only">Open WhatsApp chat</span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-[#E6C200] border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
};
