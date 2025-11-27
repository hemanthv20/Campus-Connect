import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './css/Feed.css';
import LoadingSpinner from './common/LoadingSpinner';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { getCurrentUser, clearUserSession } from '../utils/userUtils';


function Feed() {
  // Get logged in user information
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  
  // Get normalized user object
  const normalizedUser = getCurrentUser();
  
  // ALL HOOKS MUST BE DECLARED FIRST - BEFORE ANY CONDITIONAL LOGIC
  // Loading Feed
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [followingUsers, setFollowingUsers] = useState(new Set());

  // Handling of Video and Image Upload
  const [imageUpload, setImageUpload] = useState([]);
  const [videoUpload, setVideoUpload] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);

  // Creation of Post
  const [post, setPost] = useState({
    content: '',
    image: null,
    video: null,
    user: normalizedUser
  });

  // Update Function
  const [updatedPost, setUpdatedPost] = useState({
    post_id: '',
    content: '',
    image: '',
    video: '',
    user: normalizedUser
  });

  const [editingPostId, setEditingPostId] = useState(null);

  // Define functions with useCallback to avoid dependency issues
  const loadFollowingList = useCallback(async () => {
    if (!normalizedUser?.userId) return;
    try {
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_FOLLOWING}/${normalizedUser.userId}`);
      const followingIds = new Set(response.data.map(u => u.userId));
      setFollowingUsers(followingIds);
    } catch (error) {
      console.error('Error loading following list:', error);
    }
  }, [normalizedUser?.userId]);

  const loadFeed = useCallback(async () => {
    setLoadingFeed(true);
    try {
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_FEED}`);
      const sortedFeed = response.data.sort((a, b) => b.post_id - a.post_id);
      setFeed(sortedFeed);
      
      // Load following list to show indicators
      loadFollowingList();
    } catch (error) {
      setFeed([]);
    } finally {
      setLoadingFeed(false);
    }
  }, [loadFollowingList]);

  // useEffect hook - must be called after function definitions but before render
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    if (normalizedUser) {
      loadFeed();
    }
  }, [isLoggedIn, navigate, normalizedUser, loadFeed]);
  
  // Add safety check for user object AFTER all hooks are declared
  if (!normalizedUser) {
    console.error('User object is invalid or missing');
    clearUserSession();
    navigate('/');
    return null;
  }
  


  const handleImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImageUpload(fileArray);
    setVideoUpload([]); // Clear video uploads
    previewFiles(fileArray);
  };

  const handleVideoUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setVideoUpload(fileArray);
    setImageUpload([]); // Clear image uploads
    previewFiles(fileArray);
  };

  const previewFiles = (files) => {
    const previewArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previewArray.push(reader.result);
        setMediaPreview([...previewArray]);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImages = () => {
    if (imageUpload.length === 0) return;

    const promises = imageUpload.map((file) => {
      const imageRef = ref(storage, `post-images/${file.name + v4()}`);
      return uploadBytes(imageRef, file)
        .then(() => getDownloadURL(imageRef))
        .catch((error) => {
          throw new Error('Failed to upload image');
        });
    });

    Promise.all(promises)
      .then((urls) => {
        urls.forEach((url) => handlePostCreation(url, 'image'));
        setImageUpload([]);
        setMediaPreview([]);
      })
      .catch((error) => {
        alert('Failed to upload images. Please try again.');
      });
  };

  const uploadVideos = () => {
    if (videoUpload.length === 0) return;

    const promises = videoUpload.map((file) => {
      const videoRef = ref(storage, `post-videos/${file.name + v4()}`);
      return uploadBytes(videoRef, file)
        .then(() => getDownloadURL(videoRef))
        .catch((error) => {
          throw new Error('Failed to upload video');
        });
    });

    Promise.all(promises)
      .then((urls) => {
        urls.forEach((url) => handlePostCreation(url, 'video'));
        setVideoUpload([]);
        setMediaPreview([]);
      })
      .catch((error) => {
        alert('Failed to upload videos. Please try again.');
      });
  };

  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (imageUpload.length > 0) {
      uploadImages();
    } else if (videoUpload.length > 0) {
      uploadVideos();
    } else {
      handlePostCreation(null, null);
    }
  };

  // FIXED: Simplified post creation
  const handlePostCreation = (mediaURL, mediaType) => {
    let newPost = { ...post };
    
    if (mediaType === 'image') {
      newPost = { ...post, image: mediaURL, video: null };
    } else if (mediaType === 'video') {
      newPost = { ...post, video: mediaURL, image: null };
    }

    axios.post(`${API_BASE_URL}${API_ENDPOINTS.CREATE_POST}`, newPost)
      .then((response) => {
        setPost({ ...post, content: '' });
        setMediaPreview([]);
        loadFeed();
      })
      .catch((error) => {
        console.error('Post creation error:', error);
        console.error('Error response:', error.response);
        if (error.response) {
          const errorMsg = typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data);
          alert(`Failed to create post: ${errorMsg}`);
        } else if (error.request) {
          alert('Cannot connect to server. Please check if backend is running.');
        } else {
          alert('Failed to create post. Please try again.');
        }
      })
  }
  
  const selectPostForEdit = (post) => {
    setEditingPostId(post.post_id);
    setUpdatedPost({
      post_id: post.post_id,
      content: post.content,
      image: post.image,
      video: post.video,
      user: post.user
    });
  };
  
  const cancelEdit = () => {
    setEditingPostId(null);
    setUpdatedPost({
      post_id: '',
      content: '',
      image: '',
      video: '',
      user: normalizedUser
    });
  };

  const handleUpdateChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_POST}`, updatedPost)
      .then((response) => {
        setEditingPostId(null);
        setUpdatedPost({
          post_id: '',
          content: '',
          image: '',
          video: '',
          user: normalizedUser
        });
        loadFeed();
      })
      .catch((error) => {
        alert('Failed to update post. Please try again.');
      });
  };

  // Post Delete Function
  const handleDeletePostClick = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
        // Use regular delete endpoint
        await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.DELETE_POST}/${postId}`);
        loadFeed();
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.message || 'Failed to delete post. Please try again.');
    }
  }

  // Detect URL Links in Content
  const detectLinks = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  };

  if (loadingFeed) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className='feed-container fade-in'>
      {/* Create Post Container */}
      <div className='create-post-container'>
        <form onSubmit={handlePostSubmit} className='post-form'>
          <div className='create-dp'>
            {normalizedUser.profile_picture ? (
              <img src={normalizedUser.profile_picture} id='post-profile-picture' alt={`${normalizedUser.username}'s profile`} />
            ) : (
              <img src={require('../assets/placeholder.png')} id='post-profile-picture' alt="Default profile" />
            )}
          </div>
          <div className='form-group'>
            <textarea 
              className='form-control' 
              placeholder='Create a new post!' 
              name='content' 
              value={post.content} 
              onChange={handlePostChange} 
              rows={4} 
              style={{ 'border': 'none' }} 
            />
            <div className='media-preview'>
              {mediaPreview && mediaPreview.map((preview, index) => (
                <div key={index}>
                  {typeof preview === 'string' && (
                    preview.startsWith("data:image") ? (
                      <img src={preview} width={300} className='img-preview' alt={`Preview ${index + 1}`} />
                    ) : (
                      <video src={preview} width={300} className='img-preview' controls />
                    )
                  )}
                </div>
              ))}
            </div>
            <div className='create-post-buttons'>
              <div className='file-input-buttons'>
                <div className='image-upload'>
                  <label htmlFor="image-file-input"><i className="fi fi-rs-graphic-style"></i></label>
                  <input type="file" id="image-file-input" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="video-upload">
                  <label htmlFor="video-file-input"><i className="fi fi-rs-play-alt"></i></label>
                  <input type="file" id="video-file-input" accept="video/*" onChange={handleVideoUpload} />
                </div>
              </div>
              <button className='post-button' type='submit'>Create Post</button>
            </div>
          </div>
        </form>
      </div>

      {/* View All Posts Container */}
      <div className='view-post-container'>
        {feed.length === 0 ? (
          <p>No posts made yet! Begin by creating one now.</p>
        ) : (
          feed.map((post) => (
            <div className='post-card' key={post.post_id}>
              <div className='post-user'>
                <div className='user-dp'>
                  {post.user.profile_picture ? (
                    <img src={post.user.profile_picture} id='post-profile-picture' alt={`${post.user.username}'s profile`} />
                  ) : (
                    <img src={require('../assets/placeholder.png')} id='post-profile-picture' alt="Default profile" />
                  )}
                </div>
                <div className='user-content'>
                  <div className='user-details'>
                    <div className='user-name-row'>
                      <b>{post.user.first_name} {post.user.last_name}</b>
                      {followingUsers.has(post.user.userId) && (
                        <span className="following-badge">Following</span>
                      )}
                    </div>
                    <Link to={`/profile/${post.user.username}`}>
                      <span>@{post.user.username}</span>
                    </Link>
                    {/* ADDED: Display college information */}
                    {(post.user.college || post.user.semester || post.user.batch) && (
                      <div className='college-info'>
                        {post.user.college && <span>{post.user.college}</span>}
                        {post.user.semester && <span> - {post.user.semester}</span>}
                        {post.user.batch && <span> ({post.user.batch})</span>}
                      </div>
                    )}
                  </div>
                  <div className='post-content'>
                    {post.image && (
                      <img src={post.image} width={300} alt="Post image" />
                    )}
                    {post.video && (
                      <video src={post.video} width={300} controls />
                    )}
                    <p dangerouslySetInnerHTML={{ __html: detectLinks(post.content) }}></p>
                    <small>Posted on {new Date(post.created_on).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
              {/* Edit/Delete buttons for post owner */}
              {editingPostId !== post.post_id && (
                <div className="post-actions">

                  
                  {/* Post owner can edit and delete their own posts */}
                  {normalizedUser.userId === post.user.userId && (
                    <>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => handleDeletePostClick(post.post_id)}
                        title="Delete post"
                      >
                        <i className="fi fi-rr-trash"></i>
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => selectPostForEdit(post)}
                        title="Edit post"
                      >
                        <i className="fi fi-rr-edit"></i>
                      </button>
                    </>
                  )}
                </div>
              )}
              

            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingPostId && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
            <div className="modal-popup-header">
              <h3>Edit Post</h3>
              <button className="modal-close-btn" onClick={cancelEdit}>
                <i className="fi fi-rr-cross"></i>
              </button>
            </div>
            <form className="modal-popup-form" onSubmit={handleUpdateSubmit}>
              <div className="modal-popup-body">
                <textarea 
                  className='form-control' 
                  name='content' 
                  onChange={handleUpdateChange} 
                  value={updatedPost.content} 
                  placeholder='Edit your post content...'
                  rows={6}
                  autoFocus
                />
              </div>
              <div className="modal-popup-footer">
                <button type="button" className="btn-cancel" onClick={cancelEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Feed