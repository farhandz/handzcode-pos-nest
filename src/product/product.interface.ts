import { Document } from 'mongoose';

export interface Product extends Document {
  category: string;
  service: string;
  price: string;
  note: string;
}
