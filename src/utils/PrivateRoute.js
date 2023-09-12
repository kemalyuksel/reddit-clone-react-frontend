import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import the toastify library

const PrivateRoute = ({ children }) => {

    if (!localStorage.getItem('token')) {
        // Show a toastify notification and then redirect to the login page
        toast.error('You need to login to access this page', {
            position: 'top-center',
            autoClose: 2000, // Close the notification after 5 seconds (adjust as needed)
        });
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
