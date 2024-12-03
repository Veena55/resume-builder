import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AddDetails from "../Forms/AddDetails";
import Sidebar from "../Navbar/Sidebar";
import Template1 from "../Resumes/Template1";
import Template2 from "../Resumes/Template2";
import Template3 from "../Resumes/Template3";
import Navbar from "../Navbar/Navbar";
import Resume from '../Resumes/Resume';
import LoginRegister from "../LoginRegister";
import useVerifyJWT from "../../utilities/useVerifyJWT";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Lazy load the Resume component
// const LoginRegister = lazy(() => import("../LoginRegister"));
const ProctectedRoute = ({ element }) => {
    const isAuthenticated = useVerifyJWT();
    console.log(isAuthenticated);
    if (isAuthenticated === null) {
        // Show a fallback while the authentication status is being verified
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to='/'></Navigate>
    }
    return element
}
const Main = ({ children }) => {
    const location = useLocation();
    const showComponent = location.pathname != '/';



    return (
        <div className="row bg-light mx-0 justify-content-between">
            <ToastContainer />
            {showComponent && <Navbar></Navbar>}
            <div className="col-12 mx-auto">
                {children}
            </div>
        </div>
    )
}

export default Main;