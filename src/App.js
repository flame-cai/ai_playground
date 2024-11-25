// src/components/App.js
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/protectedRoute';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [user, setUser] = useState(null);
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(100);
  const logoutTimerRef = useRef(null);

  const handleLoginSuccess = (userData) => {
    const { token, expiresIn } = userData;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    resetLogoutTimer();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    clearTimeout(logoutTimerRef.current);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      alert('You have been logged out due to inactivity.');
      handleLogout();
    }, 60 * 60 * 1000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    window.addEventListener('mousemove', resetLogoutTimer);
    window.addEventListener('keydown', resetLogoutTimer);

    return () => {
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keydown', resetLogoutTimer);
      clearTimeout(logoutTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (user) {
      resetLogoutTimer();
    }
  }, [user]);

  return (
    <AuthProvider>
    <Router>
      <div className="App d-flex">
        {user && (
          <nav className="sidebar d-flex flex-column align-items-center">
            <div className="logo my-3">
              <img src="flame_img.jpeg" alt="FLAME Logo" className="img-fluid" />
            </div>
            <hr className="w-75" />
            <ul className="nav flex-column w-100 text-center">
              <li className="nav-item">
                <Link to="/conversation-companion" className="nav-link">Conversation Tool</Link>
              </li>
            </ul>
            <div className="mt-auto w-100 p-3">
              <h3 className="text-center mb-3">Parameters</h3>
              <div className="mb-3">
                <label className="d-block mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-100"
                />
              </div>
              <div>
                <label className="d-block mb-2">
                  Max Tokens: {maxTokens}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(e.target.value)}
                  className="w-100"
                />
              </div>
            </div>
          </nav>
        )}
        <div className="content flex-grow-1">
          {user && (
            <div className="logout-container">
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          )}
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route 
                  path="/conversation-companion" 
                  element={
                    <ProtectedRoute user={user}>
                      <Chat 
                        temperature={temperature} 
                        maxTokens={maxTokens} 
                      />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/conversation-companion" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
