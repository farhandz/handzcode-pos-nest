import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  businessName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  password: { type: String, required: true },
  level: { type: String, required: true, default: 'kasir' },
});
