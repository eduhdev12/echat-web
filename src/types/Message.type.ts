export interface Message {
  message: NewMessage;
  sender: UserMessage;
}

export interface EncryptedMessage {
  data: string;
  iv: Uint8Array;
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

export interface SetMessage {
  id: string;
  sender: UserMessage;
  content: string;
  createdAt: Date;
}
