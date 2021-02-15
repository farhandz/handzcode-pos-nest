import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
