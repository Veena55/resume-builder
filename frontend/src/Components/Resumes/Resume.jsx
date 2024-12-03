import { useRef } from "react"
import Template1 from "./Template1";
import Temp1 from '../../assets/images/template1.png'
import Temp2 from '../../assets/images/template2.png'
import Temp3 from '../../assets/images/template3.png'
import { Link } from "react-router-dom";

const Resume = () => {

    return (
        <>
            <div className="py-3" style={{ minHeight: "100vh", background: "#fff" }}>
                <h4 className="text-center text-dark-theme py-3">Choose the template</h4>
                <div className="row mx-0 align-items-start py-5">
                    <div className="col-10 col-lg-3 my-2 shadow shadow-light mx-auto p-3 bg-light-theme rounded-3">
                        <Link to='/add/template1'>
                            <img src={Temp1} style={{ objectFit: "contain", width: "100%" }} alt="" />
                        </Link>
                    </div>
                    <div className="col-10 col-lg-3 my-2 shadow mx-auto p-3 bg-light-theme rounded-3">
                        <Link to='/add/template2'>
                            <img src={Temp2} style={{ objectFit: "contain", width: "100%" }} alt="" />
                        </Link>
                    </div>
                    <div className="col-10 col-lg-3 shadow my-2 mx-auto p-3 bg-light-theme rounded-3">
                        <Link to='/add/template3'>
                            <img src={Temp3} style={{ objectFit: "contain", width: "100%" }} alt="" />
                        </Link>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Resume;