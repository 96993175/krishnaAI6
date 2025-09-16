import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Trigger slide up animation on mount
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 transition-transform duration-500 ${isAnimated ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-gray-200 focus-within:border-amber-400 focus-within:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
            <button
              type="button"
              className="p-4 text-gray-400 hover:text-amber-500 transition-all duration-200 hover:scale-110 transform hover:bg-amber-50 rounded-l-2xl"
              disabled={disabled}
            >
              <Mic size={22} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Krishna for divine guidance…"
              className="flex-1 bg-transparent px-3 py-4 focus:outline-none text-gray-800 placeholder-gray-400 font-medium text-base"
              disabled={disabled}
            />
            <button
              type="submit"
              disabled={disabled || !message.trim()}
              className="p-4 text-gray-400 hover:text-white hover:bg-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-110 transform rounded-r-2xl group"
            >
              <Send size={22} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputBar;