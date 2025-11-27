import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { getCurrentUser } from '../utils/userUtils';

function DebugFeed() {
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: API_BASE_URL,
    user: null,
    isLoggedIn: null,
    feedResponse: null,
    error: null
  });

  useEffect(() => {
    const runDebug = async () => {
      try {
        // Check localStorage
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const user = getCurrentUser();
        
        console.log('Debug Info:');
        console.log('API_BASE_URL:', API_BASE_URL);
        console.log('isLoggedIn:', isLoggedIn);
        console.log('user:', user);
        
        setDebugInfo(prev => ({
          ...prev,
          isLoggedIn,
          user,
          apiUrl: API_BASE_URL
        }));

        // Test API connection
        if (user) {
          try {
            console.log('Testing feed API...');
            const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_FEED}`);
            console.log('Feed response:', response.data);
            
            setDebugInfo(prev => ({
              ...prev,
              feedResponse: response.data
            }));
          } catch (apiError) {
            console.error('Feed API error:', apiError);
            setDebugInfo(prev => ({
              ...prev,
              error: apiError.message
            }));
          }
        }
      } catch (error) {
        console.error('Debug error:', error);
        setDebugInfo(prev => ({
          ...prev,
          error: error.message
        }));
      }
    };

    runDebug();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Debug Information</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>API Configuration:</h3>
        <p><strong>API URL:</strong> {debugInfo.apiUrl}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Authentication Status:</h3>
        <p><strong>isLoggedIn:</strong> {debugInfo.isLoggedIn}</p>
        <p><strong>User Object:</strong></p>
        <pre>{JSON.stringify(debugInfo.user, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>API Response:</h3>
        {debugInfo.error ? (
          <div style={{ color: 'red' }}>
            <p><strong>Error:</strong> {debugInfo.error}</p>
          </div>
        ) : (
          <div>
            <p><strong>Feed Data:</strong></p>
            <pre>{JSON.stringify(debugInfo.feedResponse, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Browser Console:</h3>
        <p>Check the browser console (F12) for additional error messages.</p>
      </div>
    </div>
  );
}

export default DebugFeed;