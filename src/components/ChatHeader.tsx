import React from 'react';
import { MessageCircle, Users } from 'lucide-react';
import type { User } from '../types/chat';

interface ChatHeaderProps {
  users: User[];
  currentUsername: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ users, currentUsername }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ChatFlow</h1>
            <p className="text-sm text-gray-600">Welcome, {currentUsername}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">{users.length} online</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};