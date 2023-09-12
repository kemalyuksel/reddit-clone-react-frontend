import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostRenderComponent from '../components/PostRenderComponent';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {

  const handleVoteClick = (voteType) => {
    console.log(voteType);
  };

  return (

    <div className="post-detail-container mb-2" key={post.id}>
      <Row >
        <Col sm={1} style={{ marginTop: "-5px" }}>
          <Row className="justify-content-center" style={{ marginLeft: "-20px" }}>
            <Col className="text-center">
              <FontAwesomeIcon as={Button} onClick={() => handleVoteClick("up")} icon="fa-solid fa-circle-up" className="post-vote" size="lg" />
            </Col>
            <Col className="text-center mt-1 mb-1">
              <span className='vote-count'>2</span>
            </Col>
            <Col className="text-center">
              <FontAwesomeIcon as={Button} onClick={() => handleVoteClick("down")} icon="fa-solid fa-circle-down" className="post-vote" size="lg" />
            </Col>
          </Row>

        </Col>
        <Col sm={11}>
          <p className="detail-post-subreddit">
            <img src={post.subRedditDto.subImgUrl} alt="Subreddit Icon" className="detail-subreddit-img rounded-circle" />
            <Link to={`/r/${post.subRedditDto.subredditName}`} className="post-link" target="_blank" rel="noopener noreferrer" >
              r/{post.subRedditDto.subredditName}
            </Link>
            &nbsp; Posted by<Link className="post-link" to={`/u/${post.userInfoDto.username}`}> u/{post.userInfoDto.username} </Link>  - {post.createdAt}
          </p>
          <Link to={`/r/${post.subRedditDto.subredditName}/comments/${post.id}`} className="post-link-description" key={post.id} >
            <h3 className="detail-post-title" >{post.title}</h3>
          </Link>


          <PostRenderComponent {...post} />
          <hr />

          <div className="post-info-metadata">
            <div>
              <span className="post-info-data"><FontAwesomeIcon icon="fa-solid fa-message" size="xl" /> 32 Comments </span>
              <span className="post-info-data"><FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" size="xl" /> Share </span>
              <span className="post-info-data"><FontAwesomeIcon icon="fa-solid fa-bookmark" size="xl" /> Save </span>
            </div>
          </div>

        </Col>
      </Row>





    </div>


  );
};

export default PostCard;
