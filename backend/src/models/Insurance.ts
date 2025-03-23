import mongoose, { Document, Schema } from 'mongoose';

export interface IInsurance extends Document {
  userId: mongoose.Types.ObjectId;
  provider: string;
  policyNumber: string;
  type: string;
  startDate: Date;
  endDate: Date;
  coverage: {
    medical: boolean;
    dental: boolean;
    vision: boolean;
    prescription: boolean;
  };
  deductible: number;
  copay: number;
  coinsurance: number;
  status: 'active' | 'expired' | 'pending';
  documents: {
    title: string;
    url: string;
    type: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const insuranceSchema = new Schema<IInsurance>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  provider: {
    type: String,
    required: [true, 'Insurance provider is required'],
    trim: true
  },
  policyNumber: {
    type: String,
    required: [true, 'Policy number is required'],
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: [true, 'Insurance type is required'],
    enum: ['Individual', 'Family', 'Student', 'Group'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  coverage: {
    medical: {
      type: Boolean,
      default: true
    },
    dental: {
      type: Boolean,
      default: false
    },
    vision: {
      type: Boolean,
      default: false
    },
    prescription: {
      type: Boolean,
      default: true
    }
  },
  deductible: {
    type: Number,
    required: [true, 'Deductible amount is required'],
    min: 0
  },
  copay: {
    type: Number,
    required: [true, 'Copay amount is required'],
    min: 0
  },
  coinsurance: {
    type: Number,
    required: [true, 'Coinsurance percentage is required'],
    min: 0,
    max: 100
  },
  status: {
    type: String,
    required: [true, 'Insurance status is required'],
    enum: ['active', 'expired', 'pending'],
    default: 'active'
  },
  documents: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['policy', 'card', 'claim', 'other'],
      trim: true
    }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
insuranceSchema.index({ userId: 1, status: 1 });
insuranceSchema.index({ policyNumber: 1 }, { unique: true });
insuranceSchema.index({ endDate: 1 });

 