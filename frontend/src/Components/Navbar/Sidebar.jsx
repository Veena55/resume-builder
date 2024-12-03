import { FaCheck } from "react-icons/fa";
import { TbProgressCheck } from "react-icons/tb";

const Sidebar = () => {
    return (
        <>
            <div className="bg-dark light-shadow position-fixed z-1" style={{ minHeight: "100vh", width: "15vw" }}>
                <div className="row mx-0">
                    <div className="col-12 pt-3 d-flex align-items-center gap-3 text-white ms-3">
                        <div className="h-100">
                            <TbProgressCheck className="fs-5 text-success" />
                            <FaCheck className="d-none text-white bg-success p-1 rounded-circle"></FaCheck> </div>
                        <div>
                            <p className="">Step 1</p>
                        </div>
                    </div>
                    <hr className="p-1 border-top border-2 border-light" />
                    <div className="col-12 d-flex align-items-center gap-3 text-white ms-3">
                        <div className="h-100">
                            <TbProgressCheck className="fs-5 text-success" />
                            <FaCheck className="d-none text-white bg-success p-1 rounded-circle"></FaCheck> </div>
                        <div>
                            <p className="">Step 2</p>
                        </div>
                    </div>
                    <hr className="p-1 border-top border-2 border-light" />
                    <div className="col-12 d-flex align-items-center gap-3 text-white ms-3">
                        <div className="h-100">
                            <TbProgressCheck className="fs-5 text-success" />
                            <FaCheck className="d-none text-white bg-success p-1 rounded-circle"></FaCheck> </div>
                        <div>
                            <p className="">Step 3</p>
                        </div>
                    </div>
                    <hr className="p-1 border-top border-2 border-light" />
                </div>
            </div >
        </>
    )
}
export default Sidebar;