import { Request, Response, NextFunction } from 'express';
import { Insurance } from '../models/Insurance';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const createInsurance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const insurance = await Insurance.create({
      ...req.body,
      userId: req.user?._id
    });

    res.status(201).json({
      status: 'success',
      data: {
        insurance
      }
    });
  } catch (error) {
    logger.error('Create insurance error:', error);
    next(error);
  }
};

export const getInsurances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const insurances = await Insurance.find({ userId: req.user?._id })
      .sort({ startDate: -1 });

    res.status(200).json({
      status: 'success',
      results: insurances.length,
      data: {
        insurances
      }
    });
  } catch (error) {
    logger.error('Get insurances error:', error);
    next(error);
  }
};

export const getInsurance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const insurance = await Insurance.findOne({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!insurance) {
      return next(new AppError('No insurance found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        insurance
      }
    });
  } catch (error) {
    logger.error('Get insurance error:', error);
    next(error);
  }
};

export const updateInsurance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const insurance = await Insurance.findOneAndUpdate(
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

    if (!insurance) {
      return next(new AppError('No insurance found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        insurance
      }
    });
  } catch (error) {
    logger.error('Update insurance error:', error);
    next(error);
  }
};

export const deleteInsurance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const insurance = await Insurance.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!insurance) {
      return next(new AppError('No insurance found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    logger.error('Delete insurance error:', error);
    next(error);
  }
};

export const getActiveInsurance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentDate = new Date();
    const insurance = await Insurance.findOne({
      userId: req.user?._id,
      status: 'active',
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    });

    if (!insurance) {
      return next(new AppError('No active insurance found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        insurance
      }
    });
  } catch (error) {
    logger.error('Get active insurance error:', error);
    next(error);
  }
};

export const addInsuranceDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, url, type } = req.body;
    const insurance = await Insurance.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      {
        $push: {
          documents: {
            title,
            url,
            type
          }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!insurance) {
      return next(new AppError('No insurance found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        insurance
      }
    });
  } catch (error) {
    logger.error('Add insurance document error:', error);
    next(error);
  }
};

export const removeInsuranceDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { documentId } = req.params;
    const insurance = await Insurance.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id
      },
      {
        $pull: {
          documents: {
            _id: documentId
          }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!insurance) {
      return next(new AppError('No insurance found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        insurance
      }
    });
  } catch (error) {
    logger.error('Remove insurance document error:', error);
    next(error);
  }
}; 