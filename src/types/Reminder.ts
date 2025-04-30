export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: Date;
  color: string;
}

export interface ReminderFormData {
  title: string;
  description: string;
  date: Date;
  color: string;
} 