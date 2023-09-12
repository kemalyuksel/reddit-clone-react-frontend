import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import Navbar from '../components/MyNavbar';
import PostRenderComponent from '../components/PostRenderComponent';
import postService from '../services/PostService';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/postDetail.css';
import { toast, ToastContainer } from 'react-toastify';

const PostDetailPage = () => {

  const navigate = useNavigate();
  const { subredditName, postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deletePost = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      setIsSubmitting(true);
      await postService.deletePost(`/${postId}`);
      toast.success(`Post deleted successfully!`, {
        position: 'top-center',
        autoClose: 1000,
      });
      navigate(`/r/${subredditName}`);
    } catch (error) {
      console.error('Gönderi silinirken bir hata oluştu:', error);
    }
  };


  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        if (!subredditName) {
          console.error('Subreddit name is missing.');
          return;
        }

        const fetchedPostDetail = await postService.get(`/r/${subredditName}/comments/${postId}`);
        setPostDetail(fetchedPostDetail);
      } catch (error) {

        navigate('/not-found');

      }
    };

    fetchPostDetail();
  }, [subredditName, postId, navigate]);


  if (!postDetail) {
    return <div>Loading...</div>;
  }




  return (
    <div className="post-detail-page" style={{ backgroundColor: '#2E2F30' }}>

      <Navbar />
      <ToastContainer />
      <div className="detail-container mt-5">
        <Row>
          <Col md={2} style={{ backgroundColor: '#2E2F30' }}></Col>

          <Col md={8} style={{ backgroundColor: '#D8E3E2', padding: '50px' }} className>
            <div className="detail-votes " style={{ backgroundColor: '#030303', marginTop: '-48px', width: '1285px', paddingLeft: '100px', marginLeft: '-50px', padding: '10px' }}>
              <div className="vote-section" style={{ marginLeft: '70px' }}>
                |
                <span className="upvote" style={{ padding: '5px' }}>
                  <FontAwesomeIcon icon="fa-solid fa-up-long vote-icons" size="lg" />
                </span>
                <span className="vote-count" style={{ color: '#D7DADC', fontSize: '12px', padding: '10px', fontWeight: '500' }}>{postDetail.votes}</span>
                <span className="downvote" style={{ padding: '5px' }}>
                  <FontAwesomeIcon icon="fa-solid fa-down-long vote-icons" size="lg" />
                </span>
                |
                <span className="post-header-title" style={{ paddingLeft: '20px' }}>{postDetail.title}</span>
              </div>
            </div>
            <Row className="detail-post-section mt-3">




              <Col md={8} >

                <div className="post-detail-container" key={postDetail.id} style={{ marginRight: "20px" }}>
                  <p className="detail-post-subreddit">
                    <img src={postDetail.subRedditDto.subImgUrl} alt="Subreddit Icon" className="detail-subreddit-img rounded-circle" />
                    <Link to={`/r/${postDetail.subRedditDto.subredditName}`} className="post-link" target="_blank" rel="noopener noreferrer">
                      r/{postDetail.subRedditDto.subredditName}
                    </Link>
                    &nbsp; Posted by<Link className="post-link" to={`/u/${postDetail.userInfoDto.username}`}> u/{postDetail.userInfoDto.username} </Link>  - {postDetail.createdAt}
                  </p>
                  <h3 className="detail-post-title">{postDetail.title}</h3>
                  <PostRenderComponent {...postDetail} />
                  <hr />
                  <div className="detail-post-info-metadata">
                    <div>
                      <span className="detail-post-info-data">
                        <FontAwesomeIcon icon="fa-solid fa-message" size="xl" /> 32 Comments
                      </span>
                      <span className="detail-post-info-data">
                        <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" size="xl" /> Share
                      </span>
                      <span className="detail-post-info-data">
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" size="xl" /> Save
                      </span>
                      {localStorage.getItem('username') === postDetail.userInfoDto.username ? (
                        <span>
                          <span className="detail-post-info-data">
                            <FontAwesomeIcon icon="fa-solid fa-edit" size="xl" /> Edit
                          </span>
                          <span className="detail-post-info-data" onClick={deletePost}>
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" size="xl" /> Delete
                          </span>
                        </span>
                      ) : null}

                    </div>
                  </div>
                </div>
              </Col>

              <Col md={3} style={{ marginTop: "13px" }}>
                <Row className="sidebar-section">
                  <div className="sidebar ">
                    <div className="sidebar-top">
                      <h6 className="about-community-title">About Community</h6>
                    </div>

                    <p>
                      {postDetail.subRedditDto.about}
                    </p>
                    <span>
                      <FontAwesomeIcon icon="fa-solid fa-calendar" size="xs" />
                      <small className="text-muted">&nbsp;&nbsp;Created {postDetail.subRedditDto.createdAt}</small>
                    </span>
                    <hr />
                    <span>
                      <FontAwesomeIcon icon="fa-user-friends" size="lg" />
                      <span className="sidebar-text"> Members</span>
                    </span>
                    <div className="create-buttons">
                      <hr />
                      {/* <button className="create-button" onClick={handleCreatePost} >Create Post</button> */}
                      {/* {isOwner ? (<button className="create-button" onClick={handleSettingsButton} > Community Settings </button>) : null} */}
                    </div>
                  </div>
                </Row>
              </Col>

            </Row>


          </Col>

          <Col md={2} style={{ backgroundColor: '#2E2F30' }} >

          </Col>

        </Row>
      </div >
    </div >
  );
};

export default PostDetailPage;
