import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import LoadingSpinner from './common/LoadingSpinner';
import './css/Profile.css';

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    loadProfile();
  }, [username, isLoggedIn, navigate]);

  const loadProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch user profile
      const userResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.SEARCH_USER}/${username}`);
      setProfileUser(userResponse.data);
      
      // Fetch user posts
      const postsResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_USER_POSTS}/${userResponse.data.user_id}`);
      const sortedPosts = postsResponse.data.sort((a, b) => b.post_id - a.post_id);
      setUserPosts(sortedPosts);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('User not found');
      } else {
        setError('Failed to load profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.DELETE_POST}/${postId}`);
      setUserPosts(userPosts.filter(post => post.post_id !== postId));
    } catch (error) {
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="profile-error">
        <h2>{error}</h2>
        <button onClick={() => navigate('/feed')}>Go to Feed</button>
      </div>
    );
  }

  return (
    <div className="profile-page fade-in">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-picture-container">
            {profileUser.profile_picture ? (
              <img src={profileUser.profile_picture} alt={`${profileUser.username}'s profile`} className="profile-picture-large" />
            ) : (
              <img src={require('../assets/placeholder.png')} alt="Default profile" className="profile-picture-large" />
            )}
          </div>
          <div className="profile-details">
            <h1>{profileUser.first_name} {profileUser.last_name}</h1>
            <p className="username">@{profileUser.username}</p>
            {profileUser.admin && (
              <span className="admin-badge">Admin</span>
            )}
            <div className="profile-meta">
              {profileUser.college && (
                <div className="meta-item">
                  <i className="fi fi-rr-graduation-cap"></i>
                  <span>{profileUser.college}</span>
                </div>
              )}
              {profileUser.semester && (
                <div className="meta-item">
                  <i className="fi fi-rr-book"></i>
                  <span>{profileUser.semester}</span>
                </div>
              )}
              {profileUser.batch && (
                <div className="meta-item">
                  <i className="fi fi-rr-calendar"></i>
                  <span>{profileUser.batch}</span>
                </div>
              )}
              {profileUser.email && (
                <div className="meta-item">
                  <i className="fi fi-rr-envelope"></i>
                  <span>{profileUser.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="posts-section">
          <h2>Posts ({userPosts.length})</h2>
          {userPosts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet</p>
            </div>
          ) : (
            <div className="posts-grid">
              {userPosts.map((post) => (
                <div className="post-card" key={post.post_id}>
                  {post.image && (
                    <img src={post.image} alt="Post" className="post-media" />
                  )}
                  {post.video && (
                    <video src={post.video} controls className="post-media" />
                  )}
                  <div className="post-content">
                    <p>{post.content}</p>
                    <small>{new Date(post.created_on).toLocaleDateString()}</small>
                  </div>
                  {(currentUser.admin || currentUser.user_id === profileUser.user_id) && (
                    <button 
                      className="delete-post-btn" 
                      onClick={() => handleDeletePost(post.post_id)}
                      title="Delete post"
                    >
                      <i className="fi fi-rr-trash"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
