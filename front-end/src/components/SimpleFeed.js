import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { getCurrentUser, clearUserSession } from '../utils/userUtils';

function SimpleFeed() {
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState('Loading...');
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testFeed = async () => {
      try {
        // Check authentication
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const user = getCurrentUser();
        
        console.log('SimpleFeed - isLoggedIn:', isLoggedIn);
        console.log('SimpleFeed - user:', user);
        
        if (!isLoggedIn) {
          navigate('/');
          return;
        }
        
        if (!user) {
          console.error('No user found');
          clearUserSession();
          navigate('/');
          return;
        }
        
        setDebugInfo('User authenticated, loading feed...');
        
        // Test API call
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_FEED}`);
        console.log('Feed response:', response.data);
        
        setFeed(response.data);
        setDebugInfo('Feed loaded successfully!');
        
      } catch (error) {
        console.error('SimpleFeed error:', error);
        setError(error.message);
        setDebugInfo('Error occurred');
      }
    };
    
    testFeed();
  }, [navigate]);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error in SimpleFeed:</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', minHeight: '500px', backgroundColor: '#f5f5f5' }}>
      <h1>Simple Feed Test</h1>
      <p><strong>Status:</strong> {debugInfo}</p>
      <p><strong>API URL:</strong> {API_BASE_URL}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Feed Data ({feed.length} posts):</h3>
        {feed.length === 0 ? (
          <p>No posts found or still loading...</p>
        ) : (
          <div>
            {feed.map((post, index) => (
              <div key={post.post_id || index} style={{ 
                border: '1px solid #ccc', 
                padding: '10px', 
                margin: '10px 0',
                backgroundColor: 'white'
              }}>
                <p><strong>Post ID:</strong> {post.post_id}</p>
                <p><strong>Content:</strong> {post.content || 'No content'}</p>
                <p><strong>User:</strong> {post.user?.firstName} {post.user?.lastName} (@{post.user?.username})</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleFeed;