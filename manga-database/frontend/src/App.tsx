import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Removed Material-UI in favor of TailwindCSS
import { client } from './apollo-client';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// Removed custom AppBar (MUI-based)
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import MangaList from './components/manga/MangaList';
import LandingPage from './components/landing/LandingPage';
import './App.css';

// MUI theme removed

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  // Drawer removed

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-slate-200">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={user ? <MangaList /> : <Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginForm onSwitchToRegister={() => (window.location.href = '/register')} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <RegisterForm onSwitchToLogin={() => (window.location.href = '/login')} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
