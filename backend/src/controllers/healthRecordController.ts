import { Request, Response, NextFunction } from 'express';
import { HealthRecord } from '../models/HealthRecord';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const createHealthRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthRecord = await HealthRecord.create({
      ...req.body,
      userId: req.user?._id
    });

    res.status(201).json({
      status: 'success',
      data: {
        healthRecord
      }
    });
  } catch (error) {
    logger.error('Create health record error:', error);
    next(error);
  }
};

export const getHealthRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthRecords = await HealthRecord.find({ userId: req.user?._id })
      .sort({ date: -1 });

    res.status(200).json({
      status: 'success',
      results: healthRecords.length,
      data: {
        healthRecords
      }
    });
  } catch (error) {
    logger.error('Get health records error:', error);
    next(error);
  }
};

export const getHealthRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthRecord = await HealthRecord.findOne({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!healthRecord) {
      return next(new AppError('No health record found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        healthRecord
      }
    });
  } catch (error) {
    logger.error('Get health record error:', error);
    next(error);
  }
};

export const updateHealthRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthRecord = await HealthRecord.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!healthRecord) {
      return next(new AppError('No health record found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        healthRecord
      }
    });
  } catch (error) {
    logger.error('Update health record error:', error);
    next(error);
  }
};

export const deleteHealthRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthRecord = await HealthRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!healthRecord) {
      return next(new AppError('No health record found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    logger.error('Delete health record error:', error);
    next(error);
  }
};

export const getHealthRecordsByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;
    const healthRecords = await HealthRecord.find({
      userId: req.user?._id,
      type
    }).sort({ date: -1 });

    res.status(200).json({
      status: 'success',
      results: healthRecords.length,
      data: {
        healthRecords
      }
    });
  } catch (error) {
    logger.error('Get health records by type error:', error);
    next(error);
  }
};

export const shareHealthRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sharedWith } = req.body;
    const healthRecord = await HealthRecord.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      { $addToSet: { sharedWith } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!healthRecord) {
      return next(new AppError('No health record found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        healthRecord
      }
    });
  } catch (error) {
    logger.error('Share health record error:', error);
    next(error);
  }
};

export const removeSharedAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sharedWith } = req.body;
    const healthRecord = await HealthRecord.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      { $pull: { sharedWith } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!healthRecord) {
      return next(new AppError('No health record found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        healthRecord
      }
    });
  } catch (error) {
    logger.error('Remove shared access error:', error);
    next(error);
  }
}; 