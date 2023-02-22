export interface Message {
  message: NewMessage;
  sender: UserMessage;
}

export interface NewMessage {
  text?: string;
  createdAt: Date;
}

export interface UserMessage {
  id: number;
  avatar: string;
  email: string;
  role: string;
  username: string;
}