import axios from "axios";
import { useEffect, useState } from "react";
import { FaClosedCaptioning, FaCross, FaDownload, FaEye, FaTrash } from "react-icons/fa";
import Template1 from "./Template1";
import { IoMdClose } from "react-icons/io";
import Template2 from "./Template2";
import Template3 from "./Template3";
import { toast } from "react-toastify";

const MyResume = () => {
    const token = localStorage.getItem('token');
    const [resume, setResume] = useState([]);
    const [showTemplate, setShowTemplate] = useState(false);
    const [templateNo, setTemplateNo] = useState(0);
    const [templateId, setTemplateId] = useState(0);

    const getResume = async () => {
        const myResumes = await axios.get(`http://localhost:8080/resume/my_resume`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        if (myResumes) {
            setResume(myResumes.data.result);
        }
    }
    useEffect(() => {
        getResume();
    }, [token]);

    const showResume = (template, templateId) => {
        setShowTemplate(true);
        setTemplateNo(template);
        setTemplateId(templateId);
    }

    const deleteResume = async (templateId) => {
        const result = await axios.post(`http://localhost:8080/resume/delete`, { tempId: templateId }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (result) {
            toast.success("Resume Deleted!!");
            getResume();
        }
    }
    console.log(resume);
    return (
        <div>{
            showTemplate ? <div className="overlow-scroll position-relative">
                <div className="position-absolute end-0 z-3">
                    <button className="btn btn-danger" onClick={() => setShowTemplate(false)}><IoMdClose size={20} /></button>
                </div>
                <div className="position-absolute left-0 right-0 bg-white" style={{ top: "5%", right: 0, left: 0, overflow: scroll }}>
                    {templateNo === 'template1' ? <Template1 tempId={templateId} /> : templateNo === 'template2' ? <Template2 tempId={templateId} /> : <Template3 tempId={templateId} />}
                </div>
            </div> :
                <div className="row mx-0" style={{ minHeight: "100vh" }}>
                    <div className="col-10 mx-auto">
                        <h2 className="text-center py-5 text-dark-theme">My Resume</h2>
                        <div className="row mx-0 justify-content-center align-item-center">
                            {resume.length == 0 ? <p className="text-danger text-center fs-4 fw-semibold inline">No Resume Found!!</p> : resume.map((ele, index) => {
                                return (<div className="col-3 bg-white p-2 rounded-2 m-3 shadow-sm" key={index}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <img src={`./src/assets/images/${ele.template}.png`} className="p-1 rounded-2 border object-fit-fill" width={150} height={100} />
                                        <div>
                                            <FaEye className="mx-2 text-dark-theme" onClick={() => showResume(ele.template, ele._id)} />
                                            <FaDownload className="mx-2 text-dark-theme" onClick={() => showResume(ele.template, ele._id)} />
                                            <FaTrash className="mx-2 text-danger" onClick={() => deleteResume(ele._id)} />
                                        </div>
                                    </div>
                                </div>)
                            })}

                        </div>
                    </div>
                </div>
        }
        </div>
    )
}

export default MyResume;