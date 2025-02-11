import React, { useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  isThinking: boolean;
}

export function ChatInterface({ messages, isThinking }: ChatInterfaceProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-grow overflow-hidden flex flex-col bg-gray-800 rounded-xl shadow-2xl">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-4 rounded-2xl ${
              message.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-200'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-200 p-4 rounded-2xl">
              Analyzing your response...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
