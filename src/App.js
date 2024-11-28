import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import GeminiInReact from './GeminiInReact';
import GeminiBookQuiz from './GeminiBookQuiz';
import GoogleAuth from './GoogleAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Listen for storage events to detect login/logout across tabs
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        {<Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/books" element={<GeminiInReact />} />
          <Route path="/quiz" element={<GeminiBookQuiz />} />
          <Route path="/auth/callback" element={<GoogleAuth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
