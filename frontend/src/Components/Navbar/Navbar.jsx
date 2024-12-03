import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navbar = () => {
    const logOut = () => {
        localStorage.removeItem("token");
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        }
    }
    return (
        <nav className="border bg-white w-100 px-5 py-2 sticky-lg-top z-3" >
            <div className="d-flex justify-content-between align-items-center pt-2">
                <div>
                    <p className="text-dark-theme text-center mb-0"><HiOutlineClipboardDocumentList size={50} /></p>
                    <small className="text-dark-theme">Resume Builder</small>
                </div>

                <ul>
                    <Link to='/' className="text-decoration-none mx-3 nav_link text-dark-theme">Home</Link>
                    <Link to='/my_resume' className="text-decoration-none mx-3 nav_link text-dark-theme">My Resume</Link>
                    <button to='/' className="text-decoration-none mx-3 nav_link bg-theme border-0 btn" onClick={logOut}>Logout</button>
                </ul>
            </div>
        </nav >
    )
}

export default Navbar;