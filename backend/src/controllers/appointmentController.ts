import { Request, Response, NextFunction } from 'express';
import { Appointment } from '../models/Appointment';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      userId: req.user?._id
    });

    res.status(201).json({
      status: 'success',
      data: {
        appointment
      }
    });
  } catch (error) {
    logger.error('Create appointment error:', error);
    next(error);
  }
};

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments = await Appointment.find({ userId: req.user?._id })
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments
      }
    });
  } catch (error) {
    logger.error('Get appointments error:', error);
    next(error);
  }
};

export const getAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!appointment) {
      return next(new AppError('No appointment found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
  } catch (error) {
    logger.error('Get appointment error:', error);
    next(error);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
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

    if (!appointment) {
      return next(new AppError('No appointment found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
  } catch (error) {
    logger.error('Update appointment error:', error);
    next(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id
    });

    if (!appointment) {
      return next(new AppError('No appointment found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    logger.error('Delete appointment error:', error);
    next(error);
  }
};

export const getUpcomingAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({
      userId: req.user?._id,
      date: { $gte: currentDate },
      status: 'scheduled'
    }).sort({ date: 1, time: 1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments
      }
    });
  } catch (error) {
    logger.error('Get upcoming appointments error:', error);
    next(error);
  }
};

export const getPastAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({
      userId: req.user?._id,
      date: { $lt: currentDate }
    }).sort({ date: -1, time: -1 });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments
      }
    });
  } catch (error) {
    logger.error('Get past appointments error:', error);
    next(error);
  }
}; 