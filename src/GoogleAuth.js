import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const token = queryParams.get('token');
    const name = queryParams.get('name');
    
    console.log('Query Params:', token, name);

    if (token && name) {
      // Store token and name in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userName', name);
      console.log("token:",token," name:",name)
      // Redirect to books page or a default authenticated page
      navigate('/books');
    } else {
      // If token or name are missing, redirect to home
      navigate('/');
    }
  }, [navigate]);

  return <p>Authenticating...</p>;
};

export default GoogleAuth;
