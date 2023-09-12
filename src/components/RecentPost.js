import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecentPost = ({ post }) => {

  let postDescription = null;

  if (post.descriptionType === 'IMAGE') {
    postDescription = (
      <div >
        <FontAwesomeIcon icon="fa-solid fa-image" id="post-recent-desc" />
      </div>
    );
  } else if (post.descriptionType === 'VIDEO') {
    postDescription = (
      <div className='post-recent-desc'>
        <FontAwesomeIcon icon="fa-solid fa-clapperboard" id="post-recent-desc" />
      </div>
    );
  } else if (post.descriptionType === 'TEXT') {
    postDescription = (
      <div className='post-recent-desc'>
        <FontAwesomeIcon icon="fa-solid fa-file-lines" id="post-recent-desc" />
      </div>
    );
  }
  else if (post.descriptionType === 'LINK') {
    postDescription = (
      <div className='post-recent-desc'>
        <FontAwesomeIcon icon="fa-solid fa-link" id="post-recent-desc" />
      </div>
    );
  }


  return (
    <div className="recent-post" key={post.id}>
      <div className="recent-post-image">
        <div className="recent-post-content">
          <div className="post-content">
            <Link to={`/r/subreddit1/comments/${post.id}`} className='post-link-description recent-link' style={{ color:"#0079D3"}}>
              {postDescription}
            </Link>
          </div>
        </div>
      </div>
      <Link to={`/r/subreddit1/comments/${post.id}`} className='post-link-description'></Link>
        <div className="recent-post-details">
          <p className="recent-post-title" title={post.title}>
            <Link to={`/r/${post.subRedditDto.subredditName}/comments/${post.id}`} className="custom-link">
              {post.title}
            </Link>
          </p>
          <div className="recent-post-metadata">
            <div>
              <span className="recent-post-info"> {post.votes} points  </span>
              <span className="recent-post-info">| 10 comments </span>
              <span className="recent-post-info">| 5h ago</span>
            </div>
          </div>
          <hr />
        </div>
    </div>
  );
};

export default RecentPost;
