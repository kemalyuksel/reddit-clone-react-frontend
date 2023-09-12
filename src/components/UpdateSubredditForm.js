import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import subredditService from '../services/SubredditService';

const SubredditUpdateForm = ({ isModalOpen, closeModal, subredditUpdateModel }) => {
    const [formData, setFormData] = useState({});
    const [formErrors, setErrors] = useState({});
    const subredditId = subredditUpdateModel.id;

    useEffect(() => {
        if (isModalOpen) {
            setFormData({ ...subredditUpdateModel });
        }
    }, [isModalOpen, subredditUpdateModel]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await subredditService.updateSubreddit(subredditId, formData);
            closeModal();

            toast.success('Subreddit updated successfully!', {
                position: 'top-right',
                autoClose: 1500,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                // Check if error.response and error.response.data are defined
                if (error.response.data.errorMessage) {
                    setErrors({ _error: error.response.data.errorMessage });
                } else {
                    setErrors(error.response.data);
                }
            } else {
                // Handle the case where error.response or error.response.data is undefined
                console.error('Error:', error);
                // You can set a default error message or take other appropriate action
            }
        }
    };


    const handleDeleteSubreddit = async () => {
        try {
            await subredditService.deleteSubreddit(subredditId); // Delete the subreddit.
            closeModal();

            toast.success('Subreddit deleted successfully!', {
                position: 'top-right',
                autoClose: 1500,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error deleting subreddit:', error);
        }
    };

    return (
        <div>
            <ToastContainer />

            <Modal show={isModalOpen} onHide={closeModal} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Update Subreddit</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
                    <Form onSubmit={handleSubmit} className="w-100" key={formData.id}>
                        {/* Add form fields for updating subreddit details */}
                        <Form.Group controlId="subredditIcon">
                            <Form.Label>Subreddit Icon URL</Form.Label>
                            <Form.Text className="text-muted"> Icon Size : 80 x 80 px</Form.Text>
                            <Form.Control
                                type="text"
                                name="subImgUrl"
                                value={formData.subImgUrl}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="subredditBackground">
                            <Form.Label>Subreddit Banner Image URL</Form.Label>
                            <Form.Text className="text-muted"> Banner Size : 1920 x 384 px</Form.Text>
                            <Form.Control
                                type="text"
                                name="bannerImgUrl"
                                value={formData.bannerImgUrl}
                                onChange={handleInputChange}
                            />
                            {formErrors['bannerImgUrl']}
                        </Form.Group>

                         <Form.Group controlId="subredditTheme">
                            <Form.Label>Subreddit Theme Image URL</Form.Label>
                            <Form.Text className="text-muted"> Theme Size : 1900px Height</Form.Text>
                            <Form.Control
                                type="text"
                                name="themeImgUrl"
                                value={formData.themeImgUrl}
                                onChange={handleInputChange}
                            />
                            {formErrors['themeImgUrl']}
                        </Form.Group>

                        <Form.Group controlId="subredditAbout">
                            <Form.Label>About Subreddit</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button className="mt-2" variant="primary" type="submit">
                            Update Subreddit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteSubreddit}>
                        Delete Subreddit
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubredditUpdateForm;
