import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
  name: string;
  description: {
    fr: string;
    en: string;
  };
  url: string;
  category: 'text' | 'image' | 'video' | 'code' | 'other';
  logoUrl?: string;
  company: string;
  pricing: string;
  version: string;
  clickStats: {
    date: Date;
    count: number;
  }[];
}

const ToolSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: {
    fr: { type: String, required: true },
    en: { type: String, required: true }
  },
  url: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['text', 'image', 'video', 'code', 'other']
  },
  logoUrl: { type: String },
  company: { type: String, default: 'Unknown' },
  pricing: { type: String, default: 'Free/Paid' },
  version: { type: String, default: '1.0' },
  clickStats: [{
    date: { type: Date, required: true },
    count: { type: Number, default: 0 }
  }]
});

export default mongoose.model<ITool>('Tool', ToolSchema);
