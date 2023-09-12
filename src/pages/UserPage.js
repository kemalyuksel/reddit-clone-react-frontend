import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/MyNavbar';
import userService from '../services/UserService';
import { Row, Col, Tabs, Tab, Accordion } from 'react-bootstrap';
import FilterCard from '../components/FilterCard';
import PostCard from '../components/PostCard';
import '../styles/userPage.css';

import UserProfileCard from '../components/UserProfileCard';


function UserPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const { username } = useParams();
    const navigate = useNavigate();


    const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);


    const openUpdateProfileModal = () => {
        setUpdateProfileModalOpen(true);
    };

    const closeUpdateProfileModal = () => {
        setUpdateProfileModalOpen(false);
    };

    const handleVoteClick = (voteType) => {
        console.log(voteType);
    };


    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };


    let filteredPosts = [...userPosts];

    if (activeFilter !== 'all') {
        filteredPosts.sort((a, b) => {
            if (activeFilter === 'new') {
                return a.createdAt - b.createdAt;
            } else {
                return b.votes - a.votes;
            }
        });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user profile info
                const fetchedUser = await userService.getUserProfileInfo(username);
                setUser(fetchedUser);

                const fetchedPosts = await userService.getUserPosts(username);
                setUserPosts(fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate('/not-found');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchUserData();
    }, [username, navigate]);


    return (
        <div id="custom-tabs" style={{ backgroundColor: "#DAE0E6", minHeight: "100vh" }}>
            <Navbar />
            <div className="container-fluid">
                <Row className="mt-5">
                    <Col md={12} style={{ backgroundColor: "white" }}>
                        <Tabs defaultActiveKey="post" id="uncontrolled-tab-example" style={{ justifyContent: "center", alignItems: "center", border: "none" }}>
                            <Tab eventKey="post" title="POSTS">
                                <Row style={{ backgroundColor: "#DAE0E6" }}>
                                    <Col md={3} style={{ backgroundColor: "#DAE0E6" }}></Col>
                                    <Col md={4} style={{ backgroundColor: "#DAE0E6" }} className="mt-3">
                                        <FilterCard activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
                                        {filteredPosts.map(post => (
                                            <PostCard
                                                key={post.id}
                                                post={post}
                                                handleVoteClick={handleVoteClick}
                                            />
                                        ))}
                                    </Col>
                                    <Col md={3} style={{ backgroundColor: "#DAE0E6" }} className="mt-3">
                                        <UserProfileCard user={user} openUpdateProfileModal={openUpdateProfileModal}
                                            isUpdateProfileModalOpen={isUpdateProfileModalOpen}
                                            closeUpdateProfileModal={closeUpdateProfileModal} />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="comment" title="COMMENTS">
                                <Row style={{ backgroundColor: "#DAE0E6" }} >
                                    <Col md={3} style={{ backgroundColor: "#DAE0E6" }}></Col>
                                    <Col md={4} style={{ backgroundColor: "#DAE0E6" }} className="mt-3">
                                        {/* <FilterCard activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
                                        {filteredPosts.map(post => (
                                            <PostCard
                                                key={post.id}
                                                post={post}
                                            />
                                        ))} */}

                                        <Accordion defaultActiveKey="1">
                                            <Accordion.Item eventKey="1" >
                                                <Accordion.Header>Comment from xxx Post (title) xxx r/subreddit xxxTime </Accordion.Header>
                                                <Accordion.Body>
                                                    <Link>
                                                        <h2>Comment</h2>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                        culpa qui officia deserunt mollit anim id est laborum.
                                                        <h5>Comment Details</h5>
                                                    </Link>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            
                                            <Accordion.Item eventKey="2" className='mt-2'>
                                                <Accordion.Header>Comment from xxx Post (title) xxx r/subreddit xxxTime </Accordion.Header>
                                                <Accordion.Body>
                                                    <Link>
                                                        <h2>Comment</h2>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                        culpa qui officia deserunt mollit anim id est laborum.
                                                        <h5>Comment Details</h5>
                                                    </Link>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3" className='mt-2'>
                                                <Accordion.Header>Comment from xxx Post (title) xxx r/subreddit xxxTime </Accordion.Header>
                                                <Accordion.Body>
                                                    <Link>
                                                        <h2>Comment</h2>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                        culpa qui officia deserunt mollit anim id est laborum.
                                                        <h5>Comment Details</h5>
                                                    </Link>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4" className='mt-2'>
                                                <Accordion.Header>Comment from xxx Post (title) xxx r/subreddit xxxTime </Accordion.Header>
                                                <Accordion.Body>
                                                    <Link>
                                                        <h2>Comment</h2>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                        culpa qui officia deserunt mollit anim id est laborum.
                                                        <h5>Comment Details</h5>
                                                    </Link>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="5" className='mt-2'>
                                                <Accordion.Header>Comment from xxx Post (title) xxx r/subreddit xxxTime </Accordion.Header>
                                                <Accordion.Body>
                                                    <Link>
                                                        <h2>Comment</h2>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                        culpa qui officia deserunt mollit anim id est laborum.
                                                        <h5>Comment Details</h5>
                                                    </Link>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>

                                    </Col>
                                    <Col md={3} style={{ backgroundColor: "#DAE0E6" }} className="mt-3">
                                        <UserProfileCard user={user} openUpdateProfileModal={openUpdateProfileModal}
                                            isUpdateProfileModalOpen={isUpdateProfileModalOpen}
                                            closeUpdateProfileModal={closeUpdateProfileModal} />
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default UserPage;
