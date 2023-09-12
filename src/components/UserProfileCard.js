import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserUpdateForm from '../components/UserUpdateForm';
import React from 'react';


function UserProfileCard({ user, openUpdateProfileModal, isUpdateProfileModalOpen, closeUpdateProfileModal }) {


    return (
        <div>
            <Card style={{ width: '20rem'}} >
                <Card.Body style={{ position: 'relative' }}>
                    <Card.Img
                        className="img-fluid rounded-circle"
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                            width: '100px',
                            height: '133px',
                            marginLeft: '93px',
                            position: 'relative',
                            zIndex: '1', // Place the second image on top
                        }}
                        variant="top"
                        src={user.profile_img}
                    />

                    {/* First Image as Background */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '22%',
                            backgroundColor: "orange",
                            backgroundSize: 'cover',
                            zIndex: '0',
                            borderRadius: "5px"
                        }}
                    ></div>

                    <Card.Title style={{ justifyContent: "center", display: "flex", fontSize: "22px", fontFamily: "IBMPlexSans,Arial,sans-serif" }}> {user.username} </Card.Title>
                    <Card.Text className="text-muted" style={{ justifyContent: "center", display: "flex", fontSize: "12px", fontFamily: "IBMPlexSans,Arial,sans-serif" }}> u/{user.username} </Card.Text>
                    <Card.Text style={{ fontSize: "14px" }}> {user.about} </Card.Text>
                    <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }} className="mb-3">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "50px" }}>
                            <p style={{ fontWeight: 'bold' }}>Karma</p>

                            <span style={{ marginTop: "-5px" }}>  <FontAwesomeIcon icon={["fas", "meteor"]} />&nbsp;&nbsp;41041 </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                            <p style={{ fontWeight: 'bold' }}>Cake Day</p>

                            <span style={{ marginTop: "-5px" }}>  <FontAwesomeIcon icon={["fas", "cake-candles"]} />&nbsp;&nbsp;{user.dateOfBirth}</span>
                        </div>
                    </div>

                    {
                        user.username === localStorage.getItem('username') ? (

                            <ButtonGroup style={{ justifyContent: "center", display: "flex" }}>
                                <Button onClick={openUpdateProfileModal} variant="primary" className="m-1" style={{ borderRadius: "20px" }}>Update Profile</Button>
                                <UserUpdateForm
                                    isModalOpen={isUpdateProfileModalOpen}
                                    closeModal={closeUpdateProfileModal}
                                    userUpdateModel={user}
                                />
                            </ButtonGroup>

                        ) : (

                            <ButtonGroup style={{ justifyContent: "center", display: "flex" }}>
                                <Button variant="primary" className="m-1" style={{ borderRadius: "20px" }}>Follow</Button>
                                <Button variant="primary" className="m-1" style={{ borderRadius: "20px" }}>Message</Button>
                            </ButtonGroup>
                        )
                    }
                </Card.Body>
            </Card>

            <Card style={{ width: '20rem' }} className='mt-3'>
                <Card.Body style={{ position: 'relative' }}>
                    <Card.Text style={{ fontSize: "14px" }} className='fw-bold'>You're a moderator of these communities</Card.Text>

                    <Card.Subtitle className="mb-2 text-muted">r/AskReddit</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">r/AskReddit</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">r/AskReddit</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">r/AskReddit</Card.Subtitle>

                    <Card.Text style={{ fontSize: "14px" }} className='fw-bold'>THERE ARE NOT REAL DATA.</Card.Text>

                </Card.Body>
            </Card>
        </div>
    );


}

export default UserProfileCard;