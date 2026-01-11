import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  typingUsers: string[];
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId, 
  typingUsers 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-2">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">Welcome to ChatFlow!</p>
            <p className="text-sm">Start a conversation by sending your first message.</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.userId === currentUserId}
            />
          ))}
          <TypingIndicator typingUsers={typingUsers} />
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};