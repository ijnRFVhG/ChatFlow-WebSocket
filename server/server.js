import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let users = new Map();
let messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    users.set(socket.id, { username, id: socket.id });
    
    // Send current messages to new user
    socket.emit('message_history', messages);
    
    // Broadcast user joined
    socket.broadcast.emit('user_joined', username);
    
    // Send updated user list
    io.emit('user_list', Array.from(users.values()));
    
    console.log(`${username} joined the chat`);
  });

  socket.on('send_message', (messageData) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now(),
        text: messageData.text,
        username: user.username,
        timestamp: new Date().toISOString(),
        userId: socket.id
      };
      
      messages.push(message);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages = messages.slice(-100);
      }
      
      io.emit('receive_message', message);
    }
  });

  socket.on('typing_start', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('user_typing', user.username);
    }
  });

  socket.on('typing_stop', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('user_stop_typing', user.username);
    }
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      socket.broadcast.emit('user_left', user.username);
      io.emit('user_list', Array.from(users.values()));
      console.log(`${user.username} left the chat`);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});