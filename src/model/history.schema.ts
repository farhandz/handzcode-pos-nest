import * as mongoose from 'mongoose';

export const historySchema = new mongoose.Schema({
  totalProduct: { type: Number, required: true },
});
