import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useVerifyJWT = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error('No token found in localStorage');
                setAuthenticated(false);
                navigate('/');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/auth/protected-route', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // console.log(response);
                if (response.status === 200) {
                    setAuthenticated(true);
                    // navigate('/resume');
                } else {
                    setAuthenticated(false);
                    navigate('/');
                }

            } catch (error) {
                console.error('Error verifying token:', error.response?.data || error.message);
                setAuthenticated(false);
            }
        };
        verifyToken();
    }, [navigate]);

    return isAuthenticated;
};
export default useVerifyJWT;
