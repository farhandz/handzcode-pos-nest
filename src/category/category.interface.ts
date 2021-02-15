import { Document } from 'mongoose';
export interface Category extends Document {
  category: string;
  createdAt: Date;
  userId: string;
}
