import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useReminders } from '../context/ReminderContext';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import ReminderForm from './ReminderForm';

const Calendar: React.FC = () => {
  const { reminders, deleteReminder } = useReminders();
  const [selectedReminder, setSelectedReminder] = useState<{
    id: string;
    title: string;
    description: string;
    date: Date;
    color: string;
  } | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = reminders.map(reminder => ({
    id: reminder.id,
    title: reminder.title,
    start: reminder.date,
    backgroundColor: reminder.color,
    textColor: '#ffffff',
    extendedProps: {
      description: reminder.description,
      color: reminder.color
    }
  }));

  const handleEventClick = (info: any) => {
    const reminder = reminders.find(r => r.id === info.event.id);
    if (reminder) {
      setSelectedReminder({
        id: reminder.id,
        title: reminder.title,
        description: reminder.description,
        date: reminder.date,
        color: reminder.color
      });
    }
  };

  const handleDateClick = (info: any) => {
    setSelectedDate(new Date(info.date));
    setIsNewFormOpen(true);
  };

  const handleDelete = () => {
    if (selectedReminder) {
      deleteReminder(selectedReminder.id);
      setSelectedReminder(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-lg"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        height="auto"
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventClassNames="hover:scale-105 transition-transform duration-200 cursor-pointer"
        dayCellClassNames="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
      />

      <Dialog 
        open={!!selectedReminder} 
        onClose={() => setSelectedReminder(null)}
        className="backdrop-blur-sm"
      >
        <DialogContent className="p-6">
          {selectedReminder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="h5" className="mb-4 font-bold">
                {selectedReminder.title}
              </Typography>
              <Box className="mb-4">
                <Typography variant="subtitle1" className="text-gray-600">
                  {format(selectedReminder.date, 'PPP p')}
                </Typography>
              </Box>
              {selectedReminder.description && (
                <Typography variant="body1" className="mb-4">
                  {selectedReminder.description}
                </Typography>
              )}
              <Box 
                className="w-4 h-4 rounded-full mb-4" 
                style={{ backgroundColor: selectedReminder.color }}
              />
            </motion.div>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={() => {
              setIsEditFormOpen(true);
              setSelectedReminder(null);
            }}
            className="text-blue-600 hover:bg-blue-50"
          >
            Edit
          </Button>
          <Button 
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
          <Button 
            onClick={() => setSelectedReminder(null)}
            className="text-gray-600 hover:bg-gray-50"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ReminderForm
        open={isNewFormOpen}
        onClose={() => setIsNewFormOpen(false)}
        initialData={selectedDate ? { ...defaultFormData, date: selectedDate } : undefined}
      />

      {selectedReminder && (
        <ReminderForm
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          initialData={selectedReminder}
          reminderId={selectedReminder.id}
        />
      )}
    </motion.div>
  );
};

const defaultFormData = {
  title: '',
  description: '',
  date: new Date(),
  color: '#1976d2',
};

export default Calendar; 