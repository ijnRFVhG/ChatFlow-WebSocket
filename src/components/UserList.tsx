import React from 'react';
import { User } from 'lucide-react';
import type { User as UserType } from '../types/chat';

interface UserListProps {
  users: UserType[];
  currentUserId: string;
}

export const UserList: React.FC<UserListProps> = ({ users, currentUserId }) => {
  return (
    <div className="bg-white border-l border-gray-200 w-64 p-4 hidden lg:block">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Users</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
              user.id === currentUserId ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              user.id === currentUserId ? 'bg-blue-500' : 'bg-gray-400'
            }`}>
              <User className="w-4 h-4 text-white" />
            </div>
            <span className={`font-medium ${
              user.id === currentUserId ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {user.username} {user.id === currentUserId && '(you)'}
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};