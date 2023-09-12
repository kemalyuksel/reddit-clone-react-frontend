import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import subredditService from '../services/SubredditService';

const CreateSubredditForm = ({ isModalOpen, closeModal }) => {

  const [subredditName, setSubredditName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setSubredditName('');
      setErrors({});
    }
  }, [isModalOpen]);

  const handleSubredditNameChange = (e) => {
    setSubredditName(e.target.value);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const subredditData = {
        subredditName: subredditName
      };

      await subredditService.createSubreddit(subredditData);

      closeModal();
      toast.success(`Created ${subredditName} successfully!`, {
        position: 'top-center',
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate(`/r/${subredditName}`);
      }, 1000);


    } catch (error) {
      if (error.response.data.errorMessage) {
        setErrors({ _error: error.response.data.errorMessage });
      } else {
        setErrors(error.response.data);
      }
      setIsSubmitting(false);
    }

  };

  const inputStyles = {
    border: errors.subredditName || errors._error ? '1px solid red' : '',
    marginBottom: errors.subredditName || errors._error ? '5px' : ''
  };


  return (
    <Modal show={isModalOpen} onHide={closeModal} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Create a community</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group controlId="subredditName">
            <Form.Label>Name <span>r/{subredditName}</span></Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text" // input türü "text" olarak değiştirildi
                placeholder="r/"
                value={subredditName}
                onChange={handleSubredditNameChange}
                style={inputStyles}
                required
              />
            </div>
            {errors._error && <div className="input-error-message">{errors._error}</div>}
            {errors.subredditName && <div className="input-error-message">{errors.subredditName}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="mt-3">
        <Button variant="outline-primary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Community
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default CreateSubredditForm;
