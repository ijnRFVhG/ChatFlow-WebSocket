import React, { useState } from 'react';
import { MessageCircle, Users, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onJoin: (username: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ChatFlow</h1>
          <p className="text-gray-600">Connect and chat in real-time</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-gray-600">
            <Zap className="w-5 h-5 text-blue-500" />
            <span>Real-time messaging</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Users className="w-5 h-5 text-purple-500" />
            <span>See who's online</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span>Typing indicators</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Choose your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              required
              maxLength={20}
            />
          </div>
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};