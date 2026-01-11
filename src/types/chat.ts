export interface Message {
  id: number;
  text: string;
  username: string;
  timestamp: string;
  userId: string;
}

export interface User {
  username: string;
  id: string;
}