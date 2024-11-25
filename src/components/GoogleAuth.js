// src/components/GoogleSignIn.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadGoogleScript } from './loadGoogleScript';
import { useAuth } from './AuthContext';

const GoogleSignIn = ({ onLoginSuccess }) => {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const { setToken } = useAuth();
  useEffect(() => {
    const loadGoogleAndInitialize = async () => {
      await loadGoogleScript();
      setIsGoogleLoaded(true);
    };

    loadGoogleAndInitialize();
  }, []);

  useEffect(() => {
    if (isGoogleLoaded && window.google) {
      const handleCredentialResponse = async (response) => {
        // console.log("Encoded JWT ID token: " + JSON.stringify(response));
        try {
          const backendResponse = await axios.post('https://asia-south1-ppt-tts.cloudfunctions.net/ai-backend/login', {
          },{
            headers: {
              'Authorization': `Bearer ${response.credential}`,
            },
          });
          // console.log('Login success:', backendResponse.data);
          localStorage.setItem("token",response.credential);
          setToken(response.credential);
          onLoginSuccess(backendResponse.data);
        } catch (error) {
          console.error('Login failed:', error);
        }
      };

      window.google.accounts.id.initialize({
        client_id: '1066118926351-dskshp8i64e3e4i5rr76h85rfbhh5cc0.apps.googleusercontent.com', // Replace with your actual client ID
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, [isGoogleLoaded, onLoginSuccess]);

  return <div id="googleSignInDiv"></div>;
};

export default GoogleSignIn;
