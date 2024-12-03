import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import '../src/assets/css/style.css';
import LoginRegister from "./Components/LoginRegister";
import Resume from './Components/Resumes/Resume';
import Template1 from './Components/Resumes/Template1';
import Template2 from './Components/Resumes/Template2';
import Template3 from './Components/Resumes/Template3';
import AddDetails from './Components/Forms/AddDetails';
// import Navbar from './Components/Navbar/Navbar';
// import Sidebar from './Components/Navbar/Sidebar';
import Main from './Components/Main/Main';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import useVerifyJWT from './utilities/useVerifyJWT';
import MyResume from './Components/Resumes/MyResume';

const ProctectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthenticated = useVerifyJWT();
  // console.log(isAuthenticated);
  if (isAuthenticated === null) {
    // Show a fallback while the authentication status is being verified
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return navigate("/");
  }
  return element
}
function App() {

  return (
    <>
      <BrowserRouter>
        <Main>
          <Routes>
            <Route path='/' element={<LoginRegister />} />
            <Route path='/my_resume' element={<ProctectedRoute element={<MyResume />} />} />
            <Route path='/resume' element={<ProctectedRoute element={<Resume />} />} />
            <Route path='/template1/:temp_id' element={<ProctectedRoute element={<Template1 />} />} />
            <Route path='/template2/:temp_id' element={<ProctectedRoute element={<Template2 />} />} />
            <Route path='/template3/:temp_id' element={<ProctectedRoute element={<Template3 />} />} />
            <Route path='/add/:template' element={<ProctectedRoute element={<AddDetails />} />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </>
  )
}

export default App
