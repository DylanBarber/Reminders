import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Reminder, ReminderFormData } from '../types/Reminder';

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: ReminderFormData) => void;
  editReminder: (id: string, reminder: ReminderFormData) => void;
  deleteReminder: (id: string) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const useReminders = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
};

export const ReminderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const addReminder = (reminder: ReminderFormData) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    setReminders([...reminders, newReminder]);
  };

  const editReminder = (id: string, reminder: ReminderFormData) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, ...reminder } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, editReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
}; 