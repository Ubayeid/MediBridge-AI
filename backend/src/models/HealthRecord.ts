import mongoose, { Document, Schema } from 'mongoose';

export interface IHealthRecord extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  type: string;
  date: Date;
  provider: string;
  status: 'active' | 'archived';
  sharedWith: string[];
  lastAccessed: Date;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const healthRecordSchema = new Schema<IHealthRecord>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Record title is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Record type is required'],
    enum: ['Medical', 'Dental', 'Lab', 'Vaccination'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Record date is required']
  },
  provider: {
    type: String,
    required: [true, 'Healthcare provider is required'],
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Record status is required'],
    enum: ['active', 'archived'],
    default: 'active'
  },
  sharedWith: [{
    type: String,
    trim: true
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  fileUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
healthRecordSchema.index({ userId: 1, type: 1 });
healthRecordSchema.index({ status: 1 });
healthRecordSchema.index({ date: 1 });

export const HealthRecord = mongoose.model<IHealthRecord>('HealthRecord', healthRecordSchema); 