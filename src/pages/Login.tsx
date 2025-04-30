import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} className="p-8 mt-16">
          <Typography variant="h4" component="h1" className="mb-6 text-center font-bold">
            Login
          </Typography>

          {error && (
            <Typography color="error" className="mb-4 text-center">
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Box className="space-y-4">
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                variant="outlined"
                className="mb-4"
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                className="mb-4"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2"
              >
                Login
              </Button>
            </Box>
          </form>

          <Box className="mt-4 text-center">
            <Typography>
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login; 