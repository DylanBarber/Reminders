import { Router } from 'express';
import { signup, login } from '../controllers/userController';
import { reminderController } from '../controllers/reminderController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Auth routes
router.post('/auth/signup', signup);
router.post('/auth/login', login);

// Reminder routes
router.get('/reminders', authenticate, reminderController.getAllReminders);
router.post('/reminders', authenticate, reminderController.createReminder);
router.put('/reminders/:id', authenticate, reminderController.updateReminder);
router.delete('/reminders/:id', authenticate, reminderController.deleteReminder);

export default router; 