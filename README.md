# ChatFlow - Real-time Chat Application

A beautiful, modern real-time chat application built with React, Vite, Node.js, and Socket.IO.

## Features

- 🚀 Real-time messaging with Socket.IO
- 👥 Live user list and online status
- ⚡ Typing indicators
- 📱 Responsive design for all devices
- 🎨 Beautiful, modern UI with smooth animations
- 🔒 Secure message handling
- 📝 Message history

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system

### Installation & Running

1. **Start both frontend and backend servers:**
   ```bash
   npm run dev:full
   ```

   This will start:
   - Frontend (React + Vite) on http://localhost:5173
   - Backend (Node.js + Socket.IO) on http://localhost:3002

2. **Alternative - Run separately:**
   
   Frontend only:
   ```bash
   npm run dev
   ```
   
   Backend only:
   ```bash
   npm run dev:server
   ```

### Usage

1. Open your browser and navigate to http://localhost:5173
2. Enter a username to join the chat
3. Start chatting in real-time!

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.tsx    # User login/join screen
│   │   ├── ChatHeader.tsx       # Chat header with user count
│   │   ├── MessageList.tsx      # Message display area
│   │   ├── MessageBubble.tsx    # Individual message component
│   │   ├── MessageInput.tsx     # Message input form
│   │   ├── TypingIndicator.tsx  # Shows typing users
│   │   └── UserList.tsx         # Online users sidebar
│   ├── hooks/
│   │   └── useSocket.ts         # Socket.IO connection hook
│   ├── types/
│   │   └── chat.ts              # TypeScript type definitions
│   └── App.tsx                  # Main application component
├── server/
│   ├── server.js                # Socket.IO server
│   └── package.json             # Server dependencies
└── package.json                 # Frontend dependencies
```

## Technologies Used

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, Socket.IO
- **Real-time:** Socket.IO for bidirectional communication