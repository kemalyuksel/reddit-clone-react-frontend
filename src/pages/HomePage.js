import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/homePage.css';
import CreatePostForm from '../components/CreatePostForm';
import CreateSubredditForm from '../components/CreateSubredditForm';
import FilterCard from '../components/FilterCard';
import PostCard from '../components/PostCard';
import RecentPost from '../components/RecentPost';
import Navbar from '../components/MyNavbar';
import postService from '../services/PostService';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { authState } = useAuth();
  const isAuthenticated = authState.isAuthenticated;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    navigate('/submit');
  };


  const [posts, setPosts] = useState([]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postService.fetchRoot();
        setPosts(
          fetchedPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);



  let filteredPosts = [...posts];

  if (activeFilter !== 'all') {
    filteredPosts.sort((a, b) => {
      if (activeFilter === 'new') {
        return b.createdAt - a.createdAt;
      } else if (activeFilter === 'top') {
        // Sort by votes in descending order
        return b.votes - a.votes;
      } else if (activeFilter === 'hot') {
        // You can define a custom formula for 'hot' sorting based on your requirements
        // For example, considering both votes and time since creation
        const aScore = a.votes * 2 - (Date.now() - new Date(a.createdAt).getTime());
        const bScore = b.votes * 2 - (Date.now() - new Date(b.createdAt).getTime());
        return bScore - aScore;
      } else if (activeFilter === 'best') {
        // You can define custom sorting logic for 'best'
        // Example: Sorting by a combination of votes and other factors
        // Replace this with your specific criteria for 'best'
        return b.customScore - a.customScore;
      }
      // Handle other cases or return a default value if needed
      return 0; // You can change this to a different default value if necessary
    });
  }




  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container mt-5">
        <Row>
          <Col md={8}>
            <CreatePostForm />
            <FilterCard activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </Col>
          <Col md={4}>
            <Row className="sidebar-section mt-5">
              <div className="sidebar mt-5">
                <div className="sidebar-top"></div>
                <div className="sidebar-header">
                  <img
                    src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
                    alt="Reddit Logo"
                    className="reddit-logo"
                  />
                  <span>Home</span>
                </div>
                <p>
                  Your personal Reddit frontpage. Come here to check in with your favorite communities.
                </p>
                {isAuthenticated ? (
                  <div className="create-buttons">
                    <hr />
                    <button className="create-button" onClick={handleButtonClick}>
                      Create Post
                    </button>
                    <button className="create-community" onClick={openModal}>
                      Create Community
                    </button>
                    <CreateSubredditForm isModalOpen={isModalOpen} closeModal={closeModal} />
                  </div>
                ) : null}
              </div>
            </Row>
            <Row className="recent-post-div">
              <div className="recent-posts-section">
                <div>
                  <div className="recent-posts-header">
                    <div>
                      <div className="recent-posts-title">
                        <p className="recent-posts-heading">Recent posts</p>
                      </div>
                      {posts.slice(0, 5).map((post) => (
                        <RecentPost
                          key={post.id}
                          post={post}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
