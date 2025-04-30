import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { ReminderFormData } from '../types/Reminder';
import { useReminders } from '../context/ReminderContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ReminderFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: ReminderFormData;
  reminderId?: string;
}

const defaultFormData: ReminderFormData = {
  title: '',
  description: '',
  date: new Date(),
  color: '#1976d2',
};

const ReminderForm: React.FC<ReminderFormProps> = ({ open, onClose, initialData, reminderId }) => {
  const [formData, setFormData] = useState<ReminderFormData>(initialData || defaultFormData);
  const { addReminder, editReminder } = useReminders();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reminderId) {
      editReminder(reminderId, formData);
    } else {
      addReminder(formData);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog 
          open={open} 
          onClose={onClose}
          className="backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
              {reminderId ? 'Edit Reminder' : 'Add Reminder'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent className="p-6">
                <Box className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <TextField
                      label="Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      fullWidth
                      className="mb-4"
                      InputProps={{
                        className: 'rounded-lg'
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <TextField
                      label="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      multiline
                      rows={4}
                      fullWidth
                      className="mb-4"
                      InputProps={{
                        className: 'rounded-lg'
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TextField
                      label="Date"
                      type="datetime-local"
                      value={formData.date.toISOString().slice(0, 16)}
                      onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                      required
                      fullWidth
                      className="mb-4"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        className: 'rounded-lg'
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Color</InputLabel>
                      <Select
                        value={formData.color}
                        label="Color"
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="rounded-lg"
                      >
                        <MenuItem value="#1976d2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
                            Blue
                          </div>
                        </MenuItem>
                        <MenuItem value="#d32f2f">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-red-500 mr-2" />
                            Red
                          </div>
                        </MenuItem>
                        <MenuItem value="#388e3c">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
                            Green
                          </div>
                        </MenuItem>
                        <MenuItem value="#f57c00">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                            Orange
                          </div>
                        </MenuItem>
                        <MenuItem value="#7b1fa2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2" />
                            Purple
                          </div>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </motion.div>
                </Box>
              </DialogContent>
              <DialogActions className="p-4 bg-gray-50">
                <Button 
                  onClick={onClose}
                  className="text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg"
                >
                  {reminderId ? 'Save' : 'Add'}
                </Button>
              </DialogActions>
            </form>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ReminderForm; 