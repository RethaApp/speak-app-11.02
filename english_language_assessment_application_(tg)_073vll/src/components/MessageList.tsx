import React from 'react';
import { Message } from '../types';
import RethaGoLogo from './RethaGoLogo';

interface MessageListProps {
  messages: Message[];
  error: string | null;
  isThinking: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, error, isThinking }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="flex items-start mb-2">
          {message.role === 'assistant' && (
            <div className="mr-2">
              <RethaGoLogo />
            </div>
          )}
          <div className={`p-3 rounded-xl break-words ${message.role === 'user' ? 'bg-blue-50 text-blue-800 self-end' : 'bg-gray-50 text-gray-800 self-start'}`}>
            {message.content}
          </div>
        </div>
      ))}
      {error && (
        <div className="text-center">
          <div className="inline-block p-3 rounded-lg bg-red-500 text-white">
            {error}
          </div>
        </div>
      )}
      {isThinking && (
        <div className="text-center">
          <div className="inline-block p-3 rounded-lg bg-gray-300 text-gray-700">
            Analyzing...
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;
