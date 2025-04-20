
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  media: String,
  type: { type: String, enum: ['photo', 'video'], default: 'photo' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
