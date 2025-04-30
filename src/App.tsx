import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Calendar from './components/Calendar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar>
        <Typography variant="h6" className="flex-grow text-gray-800">
          Reminder App
        </Typography>
        {user && (
          <div className="flex items-center space-x-4">
            <Typography className="text-gray-600">
              Welcome, {user.name}
            </Typography>
            <Button
              onClick={logout}
              className="text-gray-600 hover:bg-gray-100"
            >
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Container className="py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
