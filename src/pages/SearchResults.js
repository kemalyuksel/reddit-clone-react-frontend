import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import authService from '../services/AuthService';
import { Container, Tab, Tabs, Card, Button, Row, Col } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar';

function SearchResults() {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');
    const [searchResults, setSearchResults] = useState({
        users: [],
        subreddits: [],
        posts: [],
    });


    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await authService.search(searchQuery);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery]);

    return (
        <div id="custom-tabs">
            <MyNavbar />
            <Container style={{ marginTop: "100px" }} >
                <Tabs defaultActiveKey="users" id="search-results-tabs" className='mb-2' style={{ backgroundColor: "white", border: "none" }}>
                    <Tab eventKey="users" title="Users">
                        {searchResults.users.length > 0 ?
                            (
                                <Row >
                                    {searchResults.users.map((user) => (

                                        <Link to={`/u/${user.username}`} className="post-link-description">
                                            <Card key={user.id} className='search-card mb-2'>
                                                <Card.Body className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={user.profile_img}
                                                            alt="Subreddit Logo"
                                                            style={{ width: "50px", height: "50px", borderRadius: "50%", borderColor: "white", borderStyle: "solid", marginRight: "10px", borderWidth: "1px" }}
                                                        />
                                                        <div>
                                                            <Link to={`/u/${user.username}`} target="_blank" rel="noopener noreferrer" className='post-link' > u/{user.username} </Link>
                                                            <span style={{ fontSize: "13px" }}>&nbsp;622k Karma </span>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        <Button variant="primary" to={`/u/${user.username}`}>
                                                            Visit/Message
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                                <div >
                                                    <span style={{ fontSize: "14px", display: "flex", marginTop: "-30px" }}>
                                                        <p style={{ margin: "20px" }}>{user.about !== null ? user.about.trim(100) : "User About"}</p>
                                                    </span>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </Row>
                            )
                            :
                            (
                                <Col className="text-center">
                                    <Card>
                                        <Card.Body >
                                            <Card.Img
                                                className="p-3"
                                                variant="top"
                                                src="https://www.redditstatic.com/desktop2x/img/telescope-snoo.png"
                                                alt={`Hm... we couldn’t find any results for "${searchQuery}"`}
                                                style={{ width: '50%', maxWidth: '200px', margin: '0 auto' }}
                                            />
                                            <Card.Text as="h4" className="mt-3">
                                                Hm... we couldn’t find any results for "{searchQuery}"
                                            </Card.Text>
                                            <Link to="/">Click return homepage</Link>
                                        </Card.Body>

                                    </Card>
                                </Col>


                            )}
                    </Tab>
                    <Tab eventKey="subreddits" title="Subreddits">
                        {searchResults.subreddits.length > 0 ?
                            (
                                <Row>
                                    {searchResults.subreddits.map((subreddit) => (

                                        <Link to={`/r/${subreddit.subredditName}`} className="post-link-description">
                                            <Card key={subreddit.id} className='search-card mb-2'>
                                                <Card.Body className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={subreddit.subImgUrl}
                                                            alt="Subreddit Logo"
                                                            style={{ width: "50px", height: "50px", borderRadius: "50%", borderColor: "white", borderStyle: "solid", marginRight: "10px", borderWidth: "1px" }}
                                                        />
                                                        <div>
                                                            <Link to={`/r/${subreddit.subredditName}`} target="_blank" rel="noopener noreferrer" className='post-link' > r/{subreddit.subredditName} </Link>

                                                            <span style={{ fontSize: "13px" }}>&nbsp;105 users</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        <Button variant="primary" to={`/r/${subreddit.subredditName}`}>
                                                            Visit/Join
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                                <div >
                                                    <span style={{ fontSize: "14px", display: "flex", marginTop: "-30px" }}>
                                                        <p style={{ margin: "20px" }}>{subreddit.about !== null ? subreddit.about.trim(100) : "Subreddit About"}</p>
                                                    </span>
                                                </div>
                                            </Card>
                                        </Link>

                                    ))}
                                </Row>
                            )
                            :
                            (
                                <Col className="text-center">
                                    <Card>
                                        <Card.Body >
                                            <Card.Img
                                                className="p-3"
                                                variant="top"
                                                src="https://www.redditstatic.com/desktop2x/img/telescope-snoo.png"
                                                alt={`Hm... we couldn’t find any results for "${searchQuery}"`}
                                                style={{ width: '50%', maxWidth: '200px', margin: '0 auto' }}
                                            />
                                            <Card.Text as="h4" className="mt-3">
                                                Hm... we couldn’t find any results for "{searchQuery}"
                                            </Card.Text>
                                            <Link to="/">Click return homepage</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}


                    </Tab>
                    <Tab eventKey="posts" title="Posts">
                        {searchResults.posts.length > 0 ?
                            (
                                <Row>



                                    {searchResults.posts.map((post) => (

                                        <Link to={`/r/${post.subredditName}/comments/${post.id}`} className='post-link-description'>
                                            <Card key={post.id} className='search-card mb-2'>

                                                <Card.Body className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <img
                                                            src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
                                                            alt="Subreddit Logo"
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                borderRadius: "50%",
                                                                borderColor: "white",
                                                                borderStyle: "solid",
                                                                marginRight: "10px",
                                                                borderWidth: "1px",
                                                            }}
                                                        />
                                                        <div>
                                                            <Link
                                                                to={`/r/${post.subredditName}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className='post-link'
                                                            >
                                                                r/{post.subredditName}
                                                            </Link>
                                                            <span style={{ fontSize: "13px" }}>&nbsp;105 users</span>
                                                            <Card.Title className='mt-2'> {post.title} </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                                <div style={{ textAlign: "right" }} >
                                                    {post.descriptionType === "IMAGE" && (
                                                        <div className='mb-2' style={{ marginTop: "-50px" }}>
                                                            <img
                                                                src={post.description}
                                                                alt="Subreddit Logo"
                                                                style={{
                                                                    width: "120px",
                                                                    height: "80px",
                                                                    marginRight: "10px",
                                                                    borderWidth: "1px",
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div style={{ textAlign: "right" }}>
                                                    {post.descriptionType === "VIDEO" ? (
                                                        <div style={{ marginTop: "-50px", marginRight: "10px" }} >
                                                            <iframe
                                                                src={post.description}
                                                                title="Video player"
                                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowFullScreen
                                                                width="9%" // Adjust the width as needed
                                                                height="80px" // Adjust the height as needed
                                                            ></iframe>
                                                        </div>
                                                    ) : null}
                                                </div>


                                                {post.descriptionType === "TEXT" && (
                                                    <div style={{ fontSize: "14px", display: "flex", justifyContent: "center", marginTop: "-50px" }}>
                                                        <p style={{ margin: "20px" }}>{post.description}</p>
                                                    </div>
                                                )}

                                                {post.descriptionType === "LINK" && (
                                                    <div style={{ fontSize: "14px", display: "flex", justifyContent: "center", marginTop: "-50px" }}>
                                                        <Link to={post.description} style={{ margin: "20px" }}>
                                                            {post.description}
                                                        </Link>
                                                    </div>
                                                )}
                                            </Card>
                                        </Link>

                                    ))}


                                </Row>
                            )
                            :
                            (
                                <Col className="text-center">
                                    <Card>
                                        <Card.Body >
                                            <Card.Img
                                                className="p-3"
                                                variant="top"
                                                src="https://www.redditstatic.com/desktop2x/img/telescope-snoo.png"
                                                alt={`Hm... we couldn’t find any results for "${searchQuery}"`}
                                                style={{ width: '50%', maxWidth: '200px', margin: '0 auto' }}
                                            />
                                            <Card.Text as="h4" className="mt-3">
                                                Hm... we couldn’t find any results for "{searchQuery}"
                                            </Card.Text>
                                            <Link to="/">Click return homepage</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}

                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}

export default SearchResults;
