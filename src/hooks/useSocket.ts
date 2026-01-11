import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverUrl: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(serverUrl);

    socketRef.current.on('connect', () => {
      setSocket(socketRef.current);
    });

    socketRef.current.on('disconnect', () => {
      setSocket(null);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [serverUrl]);

  return socket;
};