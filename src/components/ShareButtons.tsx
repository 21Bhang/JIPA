import React, { useState } from 'react';
import { Share2, Check, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  text?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, text }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || window.location.href;
  const shareText = encodeURIComponent(`${title} - Jonglei Independent Political Alliance (JIPA)\n${currentUrl}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-[#888888] font-bold flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5 text-[#999999]" />
        <span>Share:</span>
      </span>

      {/* WhatsApp Share Button */}
      <a
        href={`https://api.whatsapp.com/send?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white px-2.5 py-1 rounded-md font-bold transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* X / Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 bg-[#f0f0f0] hover:bg-[#222222] text-[#222222] hover:text-white px-2.5 py-1 rounded-md font-bold transition-colors"
        title="Share on X"
      >
        <span>𝕏 Post</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 bg-[#f0f0f0] hover:bg-[#dddddd] text-[#444444] px-2.5 py-1 rounded-md font-medium transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Copied</span>
          </>
        ) : (
          <span>Copy Link</span>
        )}
      </button>
    </div>
  );
};
