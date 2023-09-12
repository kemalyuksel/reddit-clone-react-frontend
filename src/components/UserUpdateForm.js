import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from '../services/UserService';

const UserUpdateForm = ({ isModalOpen, closeModal, userUpdateModel }) => {
    const [formData, setFormData] = useState({});
    const [formErrors, setErrors] = useState({});
    const username = localStorage.getItem('username');


    useEffect(() => {
        if (isModalOpen) {
            setFormData({ ...userUpdateModel });
        }
    }, [isModalOpen, userUpdateModel]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userService.updateUserProfile(username, formData);
            closeModal();

            toast.success('Profile updated successfully!', {
                position: 'top-right',
                autoClose: 1500
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            if (error.response.data.errorMessage) {
                setErrors({ _error: error.response.data.errorMessage });
            } else {
                setErrors(error.response.data);
            }
        }
    };




    return (
        <div>
            <ToastContainer />

            <Modal show={isModalOpen} onHide={closeModal} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
                    <Form onSubmit={handleSubmit} className="w-100" key={formData.id}>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                className='rounded-circle'
                                src={formData.profile_img}
                                alt=""
                                style={{ width: '100px', height: '100px', marginBottom: '10px' }}

                            />

                        </div>
                        <Form.Group controlId="profile_img">
                            <Form.Label>Profile Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="profile_img"
                                value={formData.profile_img}
                                onChange={handleInputChange}
                            />
                        </Form.Group>



                        <Form.Group controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleInputChange}
                                isInvalid={formErrors['displayName']}
                                
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors['displayName']}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                isInvalid={formErrors['firstName']}
                                
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors['firstName']}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                isInvalid={formErrors['lastName']}
                               
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors['lastName']}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="dateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="about">
                            <Form.Label>About</Form.Label>
                            <Form.Control
                                as="input"
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button className='mt-2' variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserUpdateForm;
