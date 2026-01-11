import React, { useState } from 'react';
import { useSocket } from './hooks/useSocket';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatRoom } from './components/ChatRoom';
import './index.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const [isJoined, setIsJoined] = useState(false);
  const socket = useSocket('http://localhost:3001');

  const handleJoin = (newUsername: string) => {
    setUsername(newUsername);
    setIsJoined(true);
  };

  if (!socket) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to chat server...</p>
        </div>
      </div>
    );
  }

  if (!isJoined) {
    return <WelcomeScreen onJoin={handleJoin} />;
  }

  return <ChatRoom socket={socket} username={username} />;
}

export default App;