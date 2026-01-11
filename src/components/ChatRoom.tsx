import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { UserList } from './UserList';
import type { Message, User } from '../types/chat';

interface ChatRoomProps {
  socket: Socket;
  username: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ socket, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('join', username);

    socket.on('message_history', (messageHistory: Message[]) => {
      setMessages(messageHistory);
    });

    socket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('user_joined', (joinedUsername: string) => {
      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: `${joinedUsername} joined the chat`,
        username: 'System',
        timestamp: new Date().toISOString(),
        userId: 'system'
      }]);
    });

    socket.on('user_left', (leftUsername: string) => {
      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: `${leftUsername} left the chat`,
        username: 'System',
        timestamp: new Date().toISOString(),
        userId: 'system'
      }]);
    });

    socket.on('user_list', (userList: User[]) => {
      setUsers(userList);
    });

    socket.on('user_typing', (typingUsername: string) => {
      setTypingUsers((prev) => {
        if (!prev.includes(typingUsername)) {
          return [...prev, typingUsername];
        }
        return prev;
      });
    });

    socket.on('user_stop_typing', (typingUsername: string) => {
      setTypingUsers((prev) => prev.filter((user) => user !== typingUsername));
    });

    return () => {
      socket.off('message_history');
      socket.off('receive_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('user_list');
      socket.off('user_typing');
      socket.off('user_stop_typing');
    };
  }, [socket, username]);

  const handleSendMessage = (text: string) => {
    socket.emit('send_message', { text });
  };

  const handleTyping = () => {
    socket.emit('typing_start');
  };

  const handleStopTyping = () => {
    socket.emit('typing_stop');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader users={users} currentUsername={username} />
      
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <MessageList 
            messages={messages} 
            currentUserId={socket.id || ''} 
            typingUsers={typingUsers}
          />
          <MessageInput
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            onStopTyping={handleStopTyping}
          />
        </div>
        
        <UserList users={users} currentUserId={socket.id || ''} />
      </div>
    </div>
  );
};