import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/createPostComp.css'; // createPost.css dosyasını ekleyin
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const CreatePostForm = ({ subredditName }) => {

  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <div className='mb-5'></div>;
  }

  const url = subredditName ? `/${subredditName}/submit` : '/submit';


  return (

    <div className="user-post-card mt-5">
      <div className="user-image">
        <img
          src="https://styles.redditmedia.com/t5_2egtdc/styles/profileIcon_snoo7434e1ed-22bb-4bf0-a8d1-fff566c7699c-headshot.png?width=256&height=256&crop=256:256,smart&s=9e0c1ae90abfe3c6d53e2eb21335bcec4c5535ea"
          alt="User Avatar"
          className="user-avatar"
        />
      </div>
      <div className="create-post">
        <Link to={url}> <input
          type="text"
          className="post-input"
          placeholder="Create Post"
        />
        </Link>
      </div>
      <div className="icons">
        <Link to={url}>
          <FontAwesomeIcon
            icon="fa-solid fa-image"
            size="lg"
            className="icon"
          />
        </Link>
        <Link to={url}>
          <FontAwesomeIcon
            icon="fa-solid fa-link"
            size="lg"
            className="icon"
          />
        </Link>
      </div>
    </div >


  );
};

export default CreatePostForm;
