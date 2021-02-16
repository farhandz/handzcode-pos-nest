import { Document } from 'mongoose';

export interface User extends Document {
  level?: string;
  nama?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  role?: string;
  saldo?: number;
  refreshToken: string;
}
