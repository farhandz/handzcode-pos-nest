import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  service: { type: String, required: true },
  price: { type: String, required: true },
  note: { type: String, required: true },
});
