import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [10000, 'Content cannot exceed 10000 characters'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
}, {
  timestamps: true,
});

// Prevent re-compilation during development
export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
