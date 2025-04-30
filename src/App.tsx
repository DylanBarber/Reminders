import React, { useState } from 'react';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ReminderProvider } from './context/ReminderContext';
import Calendar from './components/Calendar';
import ReminderForm from './components/ReminderForm';
import { motion } from 'framer-motion';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <ReminderProvider>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AppBar 
          position="static" 
          className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
        >
          <Toolbar>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h6" 
                component="div" 
                className="flex-grow text-white font-bold"
              >
                Reminder App
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                className="text-white border-white hover:bg-white/10"
                variant="outlined"
                onClick={() => setIsFormOpen(true)}
              >
                Add Reminder
              </Button>
            </motion.div>
          </Toolbar>
        </AppBar>
        <Container 
          maxWidth="lg" 
          className="py-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Calendar />
          </motion.div>
        </Container>
        <ReminderForm 
          open={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      </div>
    </ReminderProvider>
  );
}

export default App;
