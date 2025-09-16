import React, { useState, useEffect } from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showTimestamp, setShowTimestamp] = useState(false);

  useEffect(() => {
    if (message.role === 'krishna' && isTyping) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < message.content.length) {
          setDisplayedText(message.content.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayedText(message.content);
    }
  }, [message.content, message.role, isTyping]);

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-6 animate-slide-in-right">
        <div className="relative">
          <div 
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs lg:max-w-md shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-medium leading-relaxed"
            onMouseEnter={() => setShowTimestamp(true)}
            onMouseLeave={() => setShowTimestamp(false)}
            onTouchStart={() => setShowTimestamp(true)}
            onTouchEnd={() => setShowTimestamp(false)}
          >
            {displayedText}
          </div>
          {showTimestamp && (
            <div className="absolute -bottom-7 right-0 text-xs text-gray-400 font-medium animate-fade-in bg-white px-2 py-1 rounded-full shadow-sm">
              {formatTimestamp(message.timestamp)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start mb-6 animate-slide-in-left">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center text-white text-lg font-medium shadow-lg mr-3 ring-2 ring-amber-200 ${isTyping ? 'animate-pulse' : 'animate-gentle-vibrate'}`}>
        🧘‍♂️
      </div>
      <div className="relative">
        <div 
          className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs lg:max-w-md shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-medium leading-relaxed"
          onMouseEnter={() => setShowTimestamp(true)}
          onMouseLeave={() => setShowTimestamp(false)}
          onTouchStart={() => setShowTimestamp(true)}
          onTouchEnd={() => setShowTimestamp(false)}
        >
          {displayedText}
          {isTyping && displayedText.length < message.content.length && (
            <span className="animate-pulse text-amber-600 font-bold">|</span>
          )}
        </div>
        {showTimestamp && (
          <div className="absolute -bottom-7 left-0 text-xs text-gray-400 font-medium animate-fade-in bg-white px-2 py-1 rounded-full shadow-sm">
            {formatTimestamp(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;