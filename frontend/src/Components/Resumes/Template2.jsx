import Model from '../../assets/images/model.jpg';
import { IoIosCall, IoMdMailOpen } from "react-icons/io";
import { LiaLinkedin } from "react-icons/lia";
import { BiGlobe } from "react-icons/bi";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Variable from '../../utilities/Variables';

const Template2 = ({ tempId }) => {
    const { temp_id } = useParams();
    const [resume, setResume] = useState({});
    const token = localStorage.getItem('token');
    const { API_URL } = Variable();
    const printRef = useRef();

    const imageToBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = (error) => {
                reject(error);
            };
            img.src = url;
        });
    };

    const handlePrint = async () => {
        const imageUrl = `${API_URL}}/uploads/${resume.image}`;
        let base64Image = '';

        try {
            base64Image = await imageToBase64(imageUrl);
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }

        // Wait for all images to be fully loaded
        const loadImages = () => {
            return new Promise((resolve) => {
                const images = document.querySelectorAll('img');
                let loadedCount = 0;
                const totalImages = images.length;
                images.forEach((image) => {
                    if (image.complete) {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            resolve();
                        }
                    } else {
                        image.onload = () => {
                            loadedCount++;
                            if (loadedCount === totalImages) {
                                resolve();
                            }
                        };
                    }
                });
            });
        };

        await loadImages();

        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);

        if (base64Image) {
            // Add the image to the PDF at the desired position and size
            const imgWidth = 30;// Width in mm
            const imgHeight = 30; // Height in mm
            const xPos = 10; // X position in mm
            const yPos = 0; // Y position in mm
            pdf.addImage(base64Image, 'PNG', xPos, yPos, imgWidth, imgHeight);
        }

        pdf.save('download.pdf');
    };

    const getData = async () => {
        const templateId = tempId || temp_id;
        try {
            const template = await axios.get(`${API_URL}}/resume/resume_details/${templateId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { result } = template.data;
            setResume(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [temp_id]);

    return (
        <>
            <div className="row mx-0 my-3" ref={printRef}>
                <div className="col-12 mx-auto p-5 border border-2 border-dark">
                    <div className="row mx-0 justify-content-between align-items-center">
                        <div className="col-3">
                            {resume.image && (
                                <div className="rounded-circle template_profile_img_cover bg-light shadow" style={{ width: "150px", height: "150px" }}>
                                    <img
                                        src={`${API_URL}}/uploads/${resume.image}`}
                                        className="object-contain rounded-circle"
                                        width="100%"
                                        height="100%"
                                        alt="my_profile"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-8">
                            <div>
                                <h1 className="fw-bold">{resume.fname + " " + resume.lname}</h1>
                            </div>
                            <div className="d-flex flex-wrap gap-3 pt-3">
                                <div>
                                    <p><IoIosCall className="rounded-2 text-white bg-dark  p-1 fs-4" /> {resume.mobile}</p>
                                </div>
                                <div>
                                    <p><IoMdMailOpen className="rounded-2 text-white bg-dark p-1  fs-4" /> {resume.email}</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 py-3 flex-wrap">
                                {resume.portfolio && (
                                    <div>
                                        <p><BiGlobe className="rounded-2 text-white bg-dark p-1  fs-4" /> {resume.portfolio}</p>
                                    </div>
                                )}
                                {resume.linkedin && (
                                    <div>
                                        <p className="d-flex gap-2 align-items-center">
                                            <LiaLinkedin className="rounded-2 text-white bg-dark text-justify  p-1 fs-4" />
                                            <span>{resume.linkedin}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="border border-1 border-black mt-4"></div>
                    <div className="row mx-0 pt-5">
                        <div className="col-3 border-end border-3 border-dark">
                            <div>
                                <h4 className="fw-bold text-uppercase pb-3">Education</h4>
                                {resume.education && (resume.education)[0].e_name ? (
                                    resume.education.map((education, index) => (
                                        <div className="pt-1" key={index}>
                                            <h6 className="fw-bold mb-0">{education.e_name}</h6>
                                            <p>{education.e_passing_year}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No education details provided.</p>
                                )}
                            </div>
                            {resume.skills && (
                                <div>
                                    <h4 className="fw-bold text-uppercase pt-5 pb-2">Skills</h4>
                                    <div className="ms-2">
                                        {resume.skills.map((element, index) => (
                                            <li key={index} className="my-0">{element}</li>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {resume.achievements && (resume.achievements)[0].a_name && (
                                <div>
                                    <h4 className="fw-bold text-uppercase pt-5 pb-2">Achievements</h4>
                                    <div className="ms-2">
                                        {resume.achievements.map((achievement, index) => (
                                            <li key={index} className="pt-2">{achievement.a_name}</li>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-7 ms-5">
                            {resume.bio && (
                                <div>
                                    <h4 className="fw-bold text-uppercase pb-3">Profile</h4>
                                    <p className="text-justify">{resume.bio}</p>
                                </div>
                            )}
                            {resume.isExperienced && resume.experienced && resume.experienced.length > 0 && (
                                <div>
                                    <h4 className="fw-bold text-uppercase pt-3">Work Experience</h4>
                                    {resume.experienced.map((element, index) => (
                                        <div className="d-flex justify-content-between pt-4" key={index}>
                                            <div>
                                                <h6 className="fw-bold">{element.w_name}</h6>
                                                <p className="mb-1">{element.w_descp}</p>
                                            </div>
                                            <div>
                                                <h6 className="fw-bold">{element.w_from} - {(new Date(element.w_to).getFullYear() === new Date().getFullYear()) ? "Present" : new Date(element.w_to).getFullYear()}</h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {resume.projects && (resume.projects)[0].p_name && (
                                <div className="mt-5">
                                    <h4 className="fw-bold text-uppercase">Projects</h4>
                                    {resume.projects.map((project, index) => (
                                        <li key={index} className="pt-2">{project.p_name}</li>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button onClick={handlePrint} className="btn bg-theme shadow my-3">Download</button>
            </div>
        </>
    );
};

export default Template2;
