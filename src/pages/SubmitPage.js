import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/submitPage.css';
import Navbar from '../components/MyNavbar';
import postService from '../services/PostService';
import subredditService from '../services/SubredditService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const SubmitPage = () => {

    const navigate = useNavigate();
    const subredditName = useParams().subredditName;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionType, setDescriptionType] = useState('TEXT');
    const [subreddit, setSubreddit] = useState(subredditName);
    const [subredditNames, setSubredditNames] = useState([]); // subreddit isimlerini saklamak için state
    const [errorMessage, setErrorMessage] = useState([]); // subreddit isimlerini saklamak için state
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchSubredditNames = async () => {
            try {
                const fetchedSubredditNames = await subredditService.getAllSubreddits(`/getNames`);
                setSubredditNames(fetchedSubredditNames);
            } catch (error) {
                console.error('Error fetching subreddit names:', error);
            }
        };

        fetchSubredditNames();
    }, []);

    const handleDescriptionTypeChange = (type) => {
        setDescriptionType(type);
        setDescription('');
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);


        try {
            const postData = {
                title: title,
                description: description,
                descriptionType: descriptionType,
                subredditName: subreddit
            };
            await postService.createPost(postData);
            toast.success(`Post created successfully!`, {
                position: 'top-center',
                autoClose: 1000,
            });
            setTimeout(() => {
                navigate(`/r/${subreddit}`);
            }, 1500);

        } catch (error) {

            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            setIsSubmitting(false);
        }
    };


    return (
        <div className="submit-page">
            <Navbar />

            <ToastContainer />

            <Row className='mt-4 p-4'>
                <Col md={3}> </Col>


                <Col md={5} className='mt-5 '>
                    <Row >
                        <Col >

                            <h5 >Create a Post</h5>
                            <hr />
                        </Col>
                    </Row>
                    <Row >
                        <Col md={4} >
                            <div >

                                <select
                                    className="form-control" value={subreddit} onChange={(e) => { setSubreddit(e.target.value) }}>
                                    <option value="">Choose a community</option>
                                    {subredditNames.map((name, index) => (
                                        <option key={index} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>

                                {errorMessage.subredditName && <div className="input-error-message p-2">{errorMessage.subredditName}</div>}
                            </div>
                        </Col>
                    </Row>
                    <Row>

                        <div>
                            <div >
                                <div >
                                </div>
                                <Form onSubmit={handleSubmit} className="bg-white rounded-2 p-3 mt-2">

                                    <Row>
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <button
                                                type="button"
                                                className={`btn btn-light d-flex align-items-center ${descriptionType === 'TEXT' ? 'active' : ''}`}
                                                onClick={() => handleDescriptionTypeChange('TEXT')}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-font" className="me-3" />
                                                Text
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn btn-light d-flex align-items-center ${descriptionType === 'IMAGE' ? 'active' : ''}`}
                                                onClick={() => handleDescriptionTypeChange('IMAGE')}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-image" className="me-3" />
                                                Image
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn btn-light d-flex align-items-center ${descriptionType === 'VIDEO' ? 'active' : ''}`}
                                                onClick={() => handleDescriptionTypeChange('VIDEO')}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-film" className="me-3" />
                                                Video
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn btn-light d-flex align-items-center ${descriptionType === 'LINK' ? 'active' : ''}`}
                                                onClick={() => handleDescriptionTypeChange('LINK')}
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-link" className="me-3" />
                                                Link
                                            </button>

                                        </div>
                                    </Row>

                                    <Form.Group className="p-2 mt-3">
                                        {errorMessage.title && <div className={errorMessage.title ? 'submit-error' : ''}>{errorMessage.title}</div>}
                                        <Form.Control required placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        {errorMessage.description && <div className={errorMessage.description ? 'submit-error' : ''}>{errorMessage.description}</div>}
                                        {descriptionType === 'TEXT' ? (
                                            <Form.Control required as="textarea" rows={5} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        ) : (
                                            <Form.Control required type="text" value={description} placeholder={`Enter ${descriptionType === 'IMAGE' ? 'Image' : descriptionType === 'VIDEO' ? 'Video' : 'Link'} URL`} onChange={(e) => setDescription(e.target.value)} />
                                        )}
                                    </Form.Group>

                                    <div className="button-container">
                                        <Button type="submit" >Share</Button>
                                    </div>
                                </Form>
                            </div>

                        </div>
                    </Row>
                </Col>
            </Row>

        </div>
    );
};

export default SubmitPage;
