import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Reminder, ReminderFormData } from '../types/Reminder';
import { useAuth } from './AuthContext';

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: ReminderFormData) => Promise<void>;
  editReminder: (id: string, reminder: ReminderFormData) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchReminders();
    }
  }, [token]);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/reminders');
      setReminders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reminders');
      console.error('Error fetching reminders:', err);
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder: ReminderFormData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/reminders', reminder);
      setReminders([...reminders, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to add reminder');
      throw err;
    }
  };

  const editReminder = async (id: string, reminder: ReminderFormData) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/reminders/${id}`, reminder);
      setReminders(reminders.map(r => (r.id === id ? response.data : r)));
      setError(null);
    } catch (err) {
      setError('Failed to update reminder');
      throw err;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/reminders/${id}`);
      setReminders(reminders.filter(r => r.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete reminder');
      throw err;
    }
  };

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        addReminder,
        editReminder,
        deleteReminder,
        loading,
        error,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}; 