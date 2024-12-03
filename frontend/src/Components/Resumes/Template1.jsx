import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { FaDotCircle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Template1 = ({ tempId }) => {
    const [resume, setResume] = useState({});
    const printRef = useRef();
    let temp_id = '';
    if (tempId) {
        temp_id = tempId;
    } else {
        temp_id = useParams().temp_id;
    }
    console.log(tempId, "hi");
    let token = localStorage.getItem('token');
    // console.log(token);
    const handlePrint = async () => {
        const element = printRef.current;
        // Temporarily set the element's width for PDF generation
        element.style.width = "1000px"; // Set a fixed width that works well for the PDF

        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');

        //revert the element's width
        element.style.width = ""; // 
    }
    const getData = async () => {
        try {
            const template = await axios.get(`http://localhost:6000/resume/resume_details/${temp_id}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            const { result } = template.data;
            setResume(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // console.log(resume);
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="row mx-0 my-3" ref={printRef}>
                <div className="col-12 mx-auto p-5 border border-2 border-dark">

                    <div>
                        <h1>{resume.fname + " " + resume.lname}</h1>
                        <div className="row mx-0">
                            <ul className="d-flex align-items-center gap-3 mb-0">
                                <p className="mb-1"><FaDotCircle size={6} /> {resume.mobile}</p>
                                <p className="mb-1"><FaDotCircle size={6} /> {resume.email}</p>
                                {resume.linkedin_url && <p className="mb-1"><FaDotCircle size={6} /> {resume.linkedin_url}</p>}
                            </ul>
                            {resume.address && <p className="mb-1">{resume.address}</p>}
                            {resume.linkedin && <p className="mb-1"><FaLinkedin /> {resume.linkedin}</p>}
                            {resume.github && <p className="mb-1"><FaGithub /> {resume.github}</p>}
                        </div>
                    </div>
                    <div className="border border-1 border-black"></div>
                    {resume.bio && (<>
                        <div className="col-12 my-2">
                            <div>

                                <h4 className="text-uppercase pt-3">Objective</h4>
                                <p className="text-justify">{resume.bio}</p>


                            </div>
                        </div>
                        <div className="border border-1 border-black mt-4"></div>
                    </>
                    )}
                    {resume.skills && (<>
                        <div className="col-12 my-2">
                            <div>
                                <h4 className="text-uppercase pt-3">Skills</h4>
                                <div className="d-flex justify-content-between py-2 flex-wrap">
                                    <div>
                                        {(resume.skills).map((element, index) => {
                                            return <li className="my-0" key={index}>{element}</li>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-1 border-black mt-4"></div>
                    </>)}
                    {resume.isExperienced && (resume.experienced)[0].w_name && <>
                        <h4 className="text-uppercase pt-3">Professional Experience</h4>
                        {(resume.experienced).map((element, index) => {
                            return (<><div className="col-12">
                                <div className="row mx-0 mt-3">
                                    <div className="col-6">
                                        <h6>{element.w_name}</h6>
                                    </div>
                                    <div className="col-6 text-end">
                                        <h6 className="fw-bold">{element.w_from} - {(new Date(element.w_to).getFullYear() === new Date().getFullYear()) ? "Present" : new Date(element.w_to).getFullYear()}</h6>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-12">
                                        <h6>{element.w_role}</h6>
                                        <p className="text-justify">{element.w_descp}</p>
                                    </div>
                                </div>
                            </div>
                            </>
                            )
                        })}
                        <div className="border border-1 border-black mt-4"></div>
                    </>}


                    {resume.projects && (<>
                        <div className="col-12 my-2">
                            <div>
                                <h4 className="text-uppercase pt-3">Projects</h4>
                                <div className="d-flex justify-content-between py-2 flex-wrap">
                                    <div>
                                        {(resume.projects).map((element, index) => {
                                            return (<div className="pt-1" key={index}>
                                                <p className="fw-medium mb-0">{element.p_name}</p>
                                                <p className="mt-1">{element.p_descp}</p>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-1 border-black mt-4"></div>
                    </>)}
                    <div className="col-12">
                        <div className="row mx-0 py-2">
                            {resume.education && (resume.education)[0].e_name && <div className="col-6 border-end border-3 border-dark">
                                <div className="pt-2">
                                    <h5 className="text-uppercase">Education</h5>
                                    {(resume.education).map((element, index) => {
                                        return (<div className="pt-2" key={index}>
                                            <p className="fw-medium mb-0">{element.e_name}</p>
                                            <p className="mb-0"><strong>{element.e_institue}</strong> - {element.e_cgpa}</p>
                                            <p className="mb-0">Passing Year - {element.e_passing_year}</p>
                                        </div>
                                        )
                                    })}
                                </div>

                            </div>}

                            {resume.achievements && (resume.achievements)[0].a_name && (<>
                                <div className="col-6">
                                    <div className="pt-2">
                                        <h5 className="text-uppercase">Achievements & Certifications</h5>
                                        {(resume.achievements).map((element, index) => {
                                            return (
                                                <div className="pt-2" key={index}>
                                                    <p className="fw-medium mb-0">{element.a_name}</p>
                                                    <p className="mt-1">{element.a_descp}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button onClick={handlePrint} className="btn bg-theme shadow my-3">Download</button>
            </div>
        </>
    )
}

export default Template1;