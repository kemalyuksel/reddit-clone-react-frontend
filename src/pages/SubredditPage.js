import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/MyNavbar';
import PostCard from '../components/PostCard';
import FilterCard from '../components/FilterCard';
import CreatePostForm from '../components/CreatePostForm';
import postService from '../services/PostService';
import subredditService from '../services/SubredditService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/subredditPage.css';
import userService from '../services/UserService';
import SubredditUpdateForm from '../components/UpdateSubredditForm';


const SubredditPage = () => {

    const navigate = useNavigate();
    const { subredditName } = useParams();
    const [subreddit, setSubreddit] = useState({});
    const [posts, setPosts] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [ownedSubs, setOwnedSubs] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const filteredPosts = [...posts];
    const [isSubredditUpdateModalOpen, setIsSubredditUpdateModalOpen] = useState(false);


    // Kod tekrarlarını önlemek için yardımcı işlevler
    const handleVoteClick = (voteType) => {
        console.log(voteType);
    };

    const handleCreatePost = () => {
        navigate(`/${subredditName}/submit`);
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleSettingsButton = () => {
        setIsSubredditUpdateModalOpen(true);
    };



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





    const handleJoinButton = async () => {
        try {
            if (isSubscribed) {
                setIsSubscribed(false);
                await subredditService.unsubscribeToSubreddit(subredditName);
                toast.info(`Left ${subredditName} successfully!`, {
                    position: 'top-center',
                    autoClose: 1000,
                });
            } else {
                toast.success(`Joined ${subredditName} successfully!`, {
                    position: 'top-center',
                    autoClose: 1000,
                });
                await subredditService.subscribeToSubreddit(subredditName);
                setIsSubscribed(true);
            }
        } catch (error) {
            console.error('Subscription Error:', error);
        }
    };

    useEffect(() => {
        const getSubreddit = async () => {
            try {
                const response = await subredditService.getByName(subredditName);
                setSubreddit(response);
            } catch (error) {
                navigate('/not-found')
                toast.error(`Subreddit Is Not Found!`, {
                    position: 'top-center',
                    autoClose: 1000,
                });
                console.error('Subreddit Error:', error);
            }
        };
        getSubreddit();
    }, [subredditName, navigate]);

    useEffect(() => {
        const getOwnedSubs = async () => {
            try {
                const response = await userService.getUserOwnedSubs(localStorage.getItem('username'));
                setOwnedSubs(response);
            } catch (error) {
                console.error('Owned Subs Error:', error);
            }
        }
        getOwnedSubs();
    }, []);

    useEffect(() => {
        const isSubredditOwner = ownedSubs.some((sub) => sub.subredditName === subredditName);
        setIsOwner(isSubredditOwner);
    }, [ownedSubs, subredditName]);

    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            try {
                const response = await subredditService.isUserSubscribed(subredditName);
                setIsSubscribed(response);
            } catch (error) {
                console.error('Subscription Status Error:', error);
            }
        };
        checkSubscriptionStatus();
    }, [subredditName]);

    useEffect(() => {
        const fetchPostsBySubredditName = async () => {
            try {
                const fetchedPosts = await postService.get(`/r/${subredditName}`);
                const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate('/not-found');
                } else {
                    console.error('Error fetching posts:', error);
                }
            }
        };

        fetchPostsBySubredditName();
    }, [subredditName, navigate]);

    

    return (
        <div className="subreddit-page" style={{ backgroundImage: `url(${subreddit.themeImgUrl})`, backgroundSize: 'cover' }}>  
            <Navbar />
            <img
                src={subreddit.bannerImgUrl || "https://codahosted.io/packs/10796/unversioned/assets/COVER/51263089de62c756dbcbf9ec93bfcc16b4accec201508dcd480d2daa2430cd2761cb7d97e5ffb41fa8f37bbae4f3682458430a47d6cf77f6d6517f7ee9881b29b1e2daae096597bf35a6e95ce71b2717d8d2b6eda08eb53064484d9f62fe487a05451a15"}
                alt="Subreddit Logo"
                className="background"
            />
            <div className="container-fluid" style={{ backgroundColor: 'white' }}>
                <ToastContainer />
                <Row>
                    <Col md={2}></Col>
                    <Col md={6}>
                        {/* Subreddit bilgilerini içeren bölüm */}
                        <div className="subreddit-info ">
                            <img
                                src={subreddit.subImgUrl || "https://toppng.com/uploads/preview/reddit-logo-reddit-icon-115628658968pe8utyxjt.png"}
                                alt="Subreddit Logo"
                                className="subreddit-logo"
                            />
                            <span className="subreddit-name">{subredditName}</span>
                            {isOwner ? (
                                // Kullanıcı sahibiyse ayarlar düğmesini göster
                                <button className="join-button" onClick={handleSettingsButton}>
                                    Settings
                                </button>
                            ) : (
                                // Kullanıcının abonelik durumuna göre katıl veya bırak düğmesini göster
                                <button className="join-button" onClick={handleJoinButton}>
                                    {isSubscribed ? 'Leave' : 'Join'}
                                </button>
                            )}
                        </div>
                    </Col>
                    <Col md={4}>
                        <SubredditUpdateForm
                            isModalOpen={isSubredditUpdateModalOpen}
                            closeModal={() => setIsSubredditUpdateModalOpen(false)}
                            subredditUpdateModel={subreddit}
                        />
                    </Col>
                </Row>
            </div>

            <div className="container ">
                <Row>
                    <Col md={2}></Col>

                    <Col md={6}>
                        <CreatePostForm subredditName={subredditName} />
                        <FilterCard activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
                        {filteredPosts.map(post => (
                            <PostCard
                                key={post.id}
                                post={post}
                                handleVoteClick={handleVoteClick}
                            />
                        ))}
                        <Card>
                            <Card.Img
                                className="mx-auto"
                                style={{
                                    width: "50%",
                                    height: "50%",
                                    display: "block",
                                    margin: "auto",
                                }}
                                variant="top"
                                src="https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg"
                            />

                            <Card.Body>
                                <Card.Title>Welcome {subredditName} !</Card.Title>
                                <Card.Text>
                                    Welcome to this subreddit! Creating our first post.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} style={{ marginTop: '60px' }}>
                        <Row className="sidebar-section  ">
                            <div className="sidebar ">
                                <div className="sidebar-top">
                                    <h6 className="about-community-title">About Community</h6>
                                </div>

                                <p>
                                    {subreddit.about}
                                </p>
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-calendar" size="xs" />
                                    <small className="text-muted">&nbsp;&nbsp;Created {subreddit.createdAt}</small>
                                </span>
                                <hr />
                                <span>
                                    <FontAwesomeIcon icon="fa-user-friends" size="lg" />
                                    <span className="sidebar-text">{subreddit.subscriberCount} Members</span>
                                </span>
                                <div className="create-buttons">
                                    <hr />
                                    <button className="create-button" onClick={handleCreatePost} >Create Post</button>
                                    {isOwner ? (<button className="create-button" onClick={handleSettingsButton} > Community Settings </button>) : null}
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default SubredditPage;
