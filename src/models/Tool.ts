import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
  name: string;
  description: string;
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
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['text', 'image', 'video', 'code', 'other'] 
  },
  logoUrl: { type: String },
  company: { type: String, default: 'Inconnu' },
  pricing: { type: String, default: 'Gratuit/Payant' },
  version: { type: String, default: '1.0' },
  clickStats: [{
    date: { type: Date, required: true },
    count: { type: Number, default: 0 }
  }]
});

export default mongoose.model<ITool>('Tool', ToolSchema);
