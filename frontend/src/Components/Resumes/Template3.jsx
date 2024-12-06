import { FaDotCircle } from "react-icons/fa";
import Model from '../../assets/images/model.jpg';
import { IoIosCall, IoMdMailOpen } from "react-icons/io";
import { MdComputer } from "react-icons/md";
import { LiaLinkedin } from "react-icons/lia";
import { BiGlobe } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Variable from "../../utilities/Variables";

const Template3 = ({ tempId }) => {
    const printRef = useRef();
    const [resume, setResume] = useState({});
    const { API_URL } = Variable();

    let token = localStorage.getItem('token');
    let temp_id = '';

    temp_id = useParams().temp_id;

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
        const imageUrl = `${API_URL}/uploads/${resume.image}`;
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
            const template = await axios.get(`${API_URL}/resume/resume_details/${templateId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { result } = template.data;
            setResume(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    console.log(resume);
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="row mx-0 my-3" ref={printRef}>
                <div className="col-12 mx-auto p-5 border border-2 border-dark">
                    <div className="row mx-0 justify-content-between align-items-center">
                        <div className="col-3">
                            {resume.image && <div className="rounded-circle template_profile_img_cover bg-light shadow">
                                <img src={`${API_URL}/uploads/${resume.image}`} className="object-contain rounded-circle" width="150" height="150" alt="my_profile" />
                            </div>}
                        </div>
                        <div className="col-9">
                            <div>
                                {resume.fname && <h1 className="fw-bold">{resume.fname}</h1>}
                            </div>
                            <div className="d-flex flex-wrap gap-3 pt-3">
                                {resume.mobile && <div>
                                    <p><IoIosCall className="rounded-2 text-white bg-dark  p-1 fs-4" /> {resume.mobile}</p>
                                </div>}

                                <div>
                                    <p><IoMdMailOpen className="rounded-2 text-white bg-dark p-1  fs-4" /> {resume.email}</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 py-3 flex-wrap">
                                {resume.portfolio && (<>
                                    <div>
                                        <p><BiGlobe className="rounded-2 text-white bg-dark p-1  fs-4" /> {resume.portfolio}</p>
                                    </div>
                                </>)}
                                {resume.linkedin && <><div>
                                    <p className="d-flex gap-2 align-items-center"><LiaLinkedin className="rounded-2 text-white bg-dark text-justify  p-1 fs-4" /> <span>{resume.linkedin}</span></p>
                                </div></>}
                            </div>
                        </div>
                    </div>
                    <div className="border border-1 border-black mt-4"></div>
                    <div className="row mx-0 pt-5">
                        <div className="col-3 pe-5 border-end border-3 border-dark">
                            <div>
                                {resume.education && (resume.education)[0].e_name &&
                                    <>
                                        <h4 className="fw-bold text-uppercase py-1 bg-dark text-white text-center shadow mb-3">Education</h4>
                                        {(resume.education).map((element, index) => {
                                            return (
                                                <div className="pt-1">
                                                    <h6 className="fw-bold mb-0">{element.e_name}</h6>
                                                    <p className="mb-0 fw-semibold">{element.e_institue}</p>
                                                    <p>Passing Year - {element.e_passing_year}</p>
                                                </div>
                                            )
                                        })}
                                    </>
                                }


                                <div>
                                    {resume.skills && <>
                                        <h4 className="fw-bold text-uppercase py-1 bg-dark text-white text-center shadow mb-32">Skills</h4>
                                        <div className="ms-2">
                                            {(resume.skills).map((element, index) => {
                                                return <li key={index} className="my-0">{element}</li>
                                            })}
                                        </div>
                                    </>
                                    }
                                </div>
                                {resume.achievements && (resume.achievements)[0].a_name &&
                                    <div>
                                        <h4 className="fw-bold text-uppercase py-1 bg-dark text-white text-center shadow my-3">Achievement</h4>
                                        <div className="ms-2">
                                            <div className="ms-2">
                                                {(resume.achievements).map((achievement, index) => <li key={index} className="pt-2">{achievement.a_name}</li>)}
                                            </div>
                                        </div>
                                    </div>}

                            </div>
                        </div>
                        <div className="col-8 ms-5">
                            {resume.bio && <div>
                                <h4 className="fw-bold text-uppercase py-1 bg-dark text-white text-center shadow mb-3">Bio</h4>
                                <p className="text-justify">{resume.bio}</p>
                            </div>}

                            {resume.isExperienced && (resume.experienced)[0].w_name &&
                                <div>
                                    <h4 className="fw-bold text-uppercase py-1 bg-dark text-white text-center shadow mb-3">Work Experience</h4>
                                    {(resume.experienced).map((element, index) => {
                                        return (
                                            <div className="d-flex justify-content-between pt-4">
                                                <div>
                                                    <h6 className="fw-bold">{element.w_name}</h6>
                                                    <p className="mb-1">{element.w_descp}</p>
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold">{element.w_from} - {(new Date(element.w_to).getFullYear() === new Date().getFullYear()) ? "Present" : new Date(element.w_to).getFullYear()}</h6> <h6 className="fw-bold">2022 - 2023</h6>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            {resume.projects && (resume.projects)[0].p_name &&
                                <div className="mt-5">
                                    <h4 className="fw-bold text-uppercase py-1 bg-dark text-white text-center shadow mb-3">Projects</h4>
                                    {(resume.projects).map((project, index) => <li key={index} className="pt-2">{project.p_name}</li>)}
                                </div>
                            }
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

export default Template3;