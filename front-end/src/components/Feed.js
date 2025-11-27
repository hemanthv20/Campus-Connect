import { useEffect, useState, useCallback } from 'react';
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
  // ALL HOOKS MUST BE DECLARED AT THE TOP - NO CONDITIONAL LOGIC BEFORE HOOKS
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const normalizedUser = getCurrentUser();
  
  // State hooks
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [followingUsers, setFollowingUsers] = useState(new Set());
  const [imageUpload, setImageUpload] = useState([]);
  const [videoUpload, setVideoUpload] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);
  const [post, setPost] = useState({
    content: '',
    image: null,
    video: null,
    user: normalizedUser
  });
  const [updatedPost, setUpdatedPost] = useState({
    post_id: '',
    content: '',
    image: '',
    video: '',
    user: normalizedUser
  });
  const [editingPostId, setEditingPostId] = useState(null);

  // Callback functions
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
      loadFollowingList();
    } catch (error) {
      setFeed([]);
    } finally {
      setLoadingFeed(false);
    }
  }, [loadFollowingList]);

  // useEffect hook
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    if (normalizedUser) {
      loadFeed();
    }
  }, [isLoggedIn, navigate, normalizedUser, loadFeed]);

  // Early return AFTER all hooks are declared
  if (!normalizedUser) {
    console.error('User object is invalid or missing');
    clearUserSession();
    navigate('/');
    return null;
  }

  // Regular functions (not hooks)
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImageUpload(fileArray);
    setVideoUpload([]);
    previewFiles(fileArray);
  };

  const handleVideoUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setVideoUpload(fileArray);
    setImageUpload([]);
    previewFiles(fileArray);
  };

  const previewFiles = async (files) => {
    const previewArray = [];
    for (const file of files) {
      const reader = new FileReader();
      const result = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      previewArray.push(result);
    }
    setMediaPreview(previewArray);
  };

  const uploadImages = async () => {
    if (imageUpload.length === 0) return;

    try {
      const promises = imageUpload.map(async (file) => {
        const imageRef = ref(storage, `post-images/${file.name + v4()}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      });

      const urls = await Promise.all(promises);
      urls.forEach((url) => handlePostCreation(url, 'image'));
      setImageUpload([]);
      setMediaPreview([]);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  const uploadVideos = async () => {
    if (videoUpload.length === 0) return;

    try {
      const promises = videoUpload.map(async (file) => {
        const videoRef = ref(storage, `post-videos/${file.name + v4()}`);
        await uploadBytes(videoRef, file);
        return getDownloadURL(videoRef);
      });

      const urls = await Promise.all(promises);
      urls.forEach((url) => handlePostCreation(url, 'video'));
      setVideoUpload([]);
      setMediaPreview([]);
    } catch (error) {
      console.error('Video upload error:', error);
      alert('Failed to upload videos. Please try again.');
    }
  };

  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

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

  const handlePostCreation = (mediaURL, mediaType) => {
    let newPost = { ...post };
    
    if (mediaType === 'image') {
      newPost = { ...post, image: mediaURL, video: null };
    } else if (mediaType === 'video') {
      newPost = { ...post, video: mediaURL, image: null };
    }

    axios.post(`${API_BASE_URL}${API_ENDPOINTS.CREATE_POST}`, newPost)
      .then(() => {
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
      });
  };
  
  const selectPostForEdit = (postToEdit) => {
    setEditingPostId(postToEdit.post_id);
    setUpdatedPost({
      post_id: postToEdit.post_id,
      content: postToEdit.content,
      image: postToEdit.image,
      video: postToEdit.video,
      user: postToEdit.user
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
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_POST}`, updatedPost)
      .then(() => {
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
        console.error('Update post error:', error);
        alert('Failed to update post. Please try again.');
      });
  };

  const handleDeletePostClick = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.DELETE_POST}/${postId}`);
      loadFeed();
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.message || 'Failed to delete post. Please try again.');
    }
  };

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
          feed.map((feedPost) => (
            <div className='post-card' key={feedPost.post_id}>
              <div className='post-user'>
                <div className='user-dp'>
                  {feedPost.user.profile_picture ? (
                    <img src={feedPost.user.profile_picture} id='post-profile-picture' alt={`${feedPost.user.username}'s profile`} />
                  ) : (
                    <img src={require('../assets/placeholder.png')} id='post-profile-picture' alt="Default profile" />
                  )}
                </div>
                <div className='user-content'>
                  <div className='user-details'>
                    <div className='user-name-row'>
                      <b>{feedPost.user.first_name} {feedPost.user.last_name}</b>
                      {followingUsers.has(feedPost.user.userId) && (
                        <span className="following-badge">Following</span>
                      )}
                    </div>
                    <Link to={`/profile/${feedPost.user.username}`}>
                      <span>@{feedPost.user.username}</span>
                    </Link>
                    {(feedPost.user.college || feedPost.user.semester || feedPost.user.batch) && (
                      <div className='college-info'>
                        {feedPost.user.college && <span>{feedPost.user.college}</span>}
                        {feedPost.user.semester && <span> - {feedPost.user.semester}</span>}
                        {feedPost.user.batch && <span> ({feedPost.user.batch})</span>}
                      </div>
                    )}
                  </div>
                  <div className='post-content'>
                    {feedPost.image && (
                      <img src={feedPost.image} width={300} alt="Post content" />
                    )}
                    {feedPost.video && (
                      <video src={feedPost.video} width={300} controls />
                    )}
                    <p dangerouslySetInnerHTML={{ __html: detectLinks(feedPost.content) }}></p>
                    <small>Posted on {new Date(feedPost.created_on).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
              {editingPostId !== feedPost.post_id && (
                <div className="post-actions">
                  {normalizedUser.userId === feedPost.user.userId && (
                    <>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => handleDeletePostClick(feedPost.post_id)}
                        title="Delete post"
                      >
                        <i className="fi fi-rr-trash"></i>
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => selectPostForEdit(feedPost)}
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
  );
}

export default Feed;