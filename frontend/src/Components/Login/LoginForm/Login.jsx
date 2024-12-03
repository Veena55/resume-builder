import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import '../../assets/style.css';
import { FaGoogle, FaLock } from "react-icons/fa";

import { FaUser } from "react-icons/fa";
import { Link, redirect, useNavigate } from 'react-router-dom';
import Variable from '../../../utilities/Variables';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { GOOGLE_CLIENT_ID } = Variable();

    const notify = (msg) => {
        return toast(msg);
    }

    const handleSuccess = async (response) => {
        const { credential } = response;
        try {
            const res = await axios.post('http://localhost:8080/auth/verify_token', { token: credential });
            localStorage.setItem('token', res.data.token);
            if (res.data.token) {
                notify("Login Successfully!!");
                navigate('/resume');
            }
        } catch (error) {
            console.error('Error verifying token', error);
        }
    }
    const handleFailure = (response) => {
        notify("Login Failed! Please try again");
        console.log('Login Failed:', response);
    };

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({ ...prevData, [name]: value }));
    }
    console.log(user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user.email == '' && user.password == '') {
                console.log(user.email);
                toast.error("Please fill all the details!!");
                return;
            }
            const response = await axios.post("http://localhost:8080/auth/login", { data: user });
            if (response) {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                toast.success("Login Success!!");
                navigate("/resume");
            }
        } catch (error) {
            console.log("Error", error);
            toast.error(error.response.data.message);
        }
    }

    return (

        <div className='login-form row mx-0 justify-content-end align-items-lg-center pt-md-5' style={{ height: "100vh", transform: "translateX(-5%)" }}>

            <div className="col-lg-4 col-md-8 mx-lg-0 mx-auto">

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className='d-flex align-items-center mb-3 input-cover'>
                            <FaUser className='text-secondary' />
                            <input type="text" className="authentication-input form-control fw-medium" placeholder='Enter your email' autoFocus name="email" value={user.email} onChange={handleFormData} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='d-flex align-items-center mb-3 input-cover'>
                            <FaLock className='text-secondary' />
                            <input type="password" className="authentication-input form-control fw-medium" placeholder='Enter your password' name="password" value={user.password} onChange={handleFormData} />
                        </div>
                    </div>
                    <div className='form-group mt-4 text-center'>
                        <button className='btn cta-btn rounded-5 shadow-sm py-2 w-100'>Login</button>
                    </div>
                </form>
                <div className='my-3'>
                    <p className='text-center fw-medium'>OR</p>
                </div>
                <div className='form-group mt-3 text-center'>
                    <div className='mt-2'></div>
                    <div className="justify-content-center py-1 d-flex align-items-center">
                        <button to='http://localhost:8080/auth/google' className='btn cta-btn rounded-circle p-2'>
                            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} nonce=''>
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={handleFailure}
                                    text='Login With'
                                    type='icon'
                                    shape="pill"
                                    promp="account_select"
                                    useOneTap
                                    auto_select
                                />
                            </GoogleOAuthProvider>
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default LoginForm