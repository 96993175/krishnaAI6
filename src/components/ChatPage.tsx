import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import TypingIndicator from './TypingIndicator';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isKrishnaTyping, setIsKrishnaTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isKrishnaTyping]);

  useEffect(() => {
    // Initial welcome message
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        const welcomeMessage: Message = {
          id: '1',
          role: 'krishna',
          content: 'Namaste Arjun 🙏, I am your KrishnaAI Saarthi. How can I guide you today?',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setIsInitialLoad(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsKrishnaTyping(true);

    // Simulate Krishna's response (replace with actual API call)
    setTimeout(() => {
      const krishnaResponses = [
        "Remember, dear Arjun, the mind is everything. What you think, you become. Focus your thoughts on righteousness and dharma, for they shall guide you to your highest potential.",
        "Just as a lamp cannot burn without oil, a person cannot live without spiritual energy. Seek the divine within yourself, for that is where true wisdom resides.",
        "The soul is neither born nor does it die. It is eternal, indestructible, and timeless. Trust in this eternal truth, and let it free you from all fears.",
        "Perform your duty with complete dedication, but remain detached from the results. This is the path to inner peace and spiritual liberation.",
        "When meditation is mastered, the mind becomes unwavering like the flame of a candle in a windless place. Cultivate this stillness within yourself.",
        "Rise above your limitations, beloved Arjun. You have infinite power within you to overcome any obstacle through devotion, right action, and unwavering faith.",
        "In the midst of chaos, find stillness. In the midst of stillness, find your true purpose. This is the way of the enlightened soul.",
        "Do not be disturbed by the dualities of life - pleasure and pain, success and failure. They are but temporary waves on the ocean of existence."
      ];

      const randomResponse = krishnaResponses[Math.floor(Math.random() * krishnaResponses.length)];
      
      const krishnaMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'krishna',
        content: randomResponse,
        timestamp: new Date(),
      };

      setIsKrishnaTyping(false);
      setMessages(prev => [...prev, krishnaMessage]);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-amber-200/50 px-4 py-5 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl font-medium shadow-xl ring-2 ring-amber-200 ${isInitialLoad ? 'animate-fade-in-glow' : 'animate-gentle-pulse'}`}>
              🧘‍♂️
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">KrishnaAI</h1>
              <p className="text-sm text-gray-500 font-medium">Divine Wisdom & Guidance</p>
            </div>
          </div>
          <button className="p-3 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110 transform">
            <MoreVertical size={22} />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 pb-32 max-w-4xl mx-auto w-full"
      >
        {messages.map((message, index) => (
          <MessageBubble 
            key={message.id} 
            message={message}
            isTyping={message.role === 'krishna' && index === messages.length - 1}
          />
        ))}
        
        {isKrishnaTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <InputBar onSendMessage={sendMessage} disabled={isKrishnaTyping} />
    </div>
  );
};

export default ChatPage;