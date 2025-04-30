import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Reminder } from '../models/Reminder';
import { User } from '../models/User';
import { z } from 'zod';

interface AuthenticatedRequest extends Request {
  user?: User;
}

const reminderSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().transform(str => new Date(str)),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const reminderController = {
  async getAllReminders(req: AuthenticatedRequest, res: Response) {
    try {
      const reminderRepository = AppDataSource.getRepository(Reminder);
      const reminders = await reminderRepository.find({
        where: { user: { id: req.user?.id } },
        order: { dueDate: 'ASC' }
      });
      return res.json(reminders);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch reminders' });
    }
  },

  async getReminderById(req: AuthenticatedRequest, res: Response) {
    try {
      const reminderRepository = AppDataSource.getRepository(Reminder);
      const reminder = await reminderRepository.findOne({
        where: { 
          id: req.params.id,
          user: { id: req.user?.id }
        }
      });
      
      if (!reminder) {
        return res.status(404).json({ error: 'Reminder not found' });
      }
      
      return res.json(reminder);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch reminder' });
    }
  },

  async createReminder(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const validatedData = reminderSchema.parse(req.body);
      const reminderRepository = AppDataSource.getRepository(Reminder);
      
      const reminder = reminderRepository.create({
        ...validatedData,
        user: req.user
      });
      
      await reminderRepository.save(reminder);
      return res.status(201).json(reminder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Failed to create reminder' });
    }
  },

  async updateReminder(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const validatedData = reminderSchema.parse(req.body);
      const reminderRepository = AppDataSource.getRepository(Reminder);
      
      const reminder = await reminderRepository.findOne({
        where: { 
          id: req.params.id,
          user: { id: req.user.id }
        }
      });
      
      if (!reminder) {
        return res.status(404).json({ error: 'Reminder not found' });
      }
      
      Object.assign(reminder, validatedData);
      await reminderRepository.save(reminder);
      return res.json(reminder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Failed to update reminder' });
    }
  },

  async updateReminderStatus(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const reminderRepository = AppDataSource.getRepository(Reminder);
      const reminder = await reminderRepository.findOne({
        where: { 
          id: req.params.id,
          user: { id: req.user.id }
        }
      });
      
      if (!reminder) {
        return res.status(404).json({ error: 'Reminder not found' });
      }
      
      reminder.completed = req.body.completed;
      await reminderRepository.save(reminder);
      return res.json(reminder);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update reminder status' });
    }
  },

  async deleteReminder(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const reminderRepository = AppDataSource.getRepository(Reminder);
      const reminder = await reminderRepository.findOne({
        where: { 
          id: req.params.id,
          user: { id: req.user.id }
        }
      });
      
      if (!reminder) {
        return res.status(404).json({ error: 'Reminder not found' });
      }
      
      await reminderRepository.remove(reminder);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete reminder' });
    }
  }
}; 