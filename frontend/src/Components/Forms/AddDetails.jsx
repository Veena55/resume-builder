import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import TextEditor from "./TextEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Variable from "../../utilities/Variables";

const AddDetails = () => {
    const [projects, setProjects] = useState([{ p_name: '', p_descp: '', showDeleteIcon: false }]);
    const [projectVal, setProjectVal] = useState([{ p_name: '', p_descp: '' }]);
    const [education, setEducation] = useState([{ e_name: '', e_passing_year: '', e_cgpa: '', e_institue: '', showDeleteIcon: false }]);
    const [educationVal, setEducationVal] = useState([{ e_name: '', e_passing_year: '', e_cgpa: '', e_institue: '' }]);
    const [skills, setSkills] = useState([{ showDeleteIcon: false }]);
    const [skillVal, setSkillVal] = useState('');
    const [achievements, setAchievements] = useState([{ a_name: '', a_descp: '', showDeleteIcon: false }]);
    const [achievementVal, setAchievementVal] = useState([{ a_name: '', a_descp: '' }]);
    const [workExperience, setworkExperience] = useState([{ w_name: '', w_role: '', w_descp: '', w_from: '', w_to: '', showDeleteIcon: false }]);
    const [workExperienceVal, setworkExperienceVal] = useState([{ w_name: '', w_role: '', w_descp: '', w_from: '', w_to: '' }]);
    const [isWorking, setWorking] = useState(false);
    const [isExperienced, setExperience] = useState(false);
    const [isSocailMediaChecked, setSocailMediaChecked] = useState({ linkedin: false, github: false });
    const [formData, setFormData] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    const [file, setFile] = useState('');
    // const [bio, setBio] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const { template } = useParams();
    const navigate = useNavigate();
    const API_URL = Variable().API_URL;

    //JWT Token
    const token = localStorage.getItem('token');

    //Add single input form data
    const [singleInputVal, setSingleInputVal] = useState({});

    //All single input
    const handleInput = (e) => {
        const { name, value } = e.target;
        setSingleInputVal({ ...singleInputVal, [name]: value });
    }


    //Add Bio
    // const addBioInput = (e) => {
    //     setBio(e.target.value)
    // }

    //Add Input elements for projects
    const addProjectInput = (e) => {
        e.preventDefault();
        let p_name = '';
        let p_descp = '';
        let showDeleteIcon = true;
        setProjects([...projects, { p_name, p_descp, showDeleteIcon }]);
    }
    const handleProjectValue = (e, index) => {
        const { name, value } = e.target;
        setProjectVal(prevState => {
            const updatedProjectValue = [...prevState];
            updatedProjectValue[index] = { ...updatedProjectValue[index], [name]: value };
            return updatedProjectValue;
        });
    }

    //Add Input elements for projects
    const addEducationInput = (e) => {
        e.preventDefault();
        setEducation([...education, {}]);

    }

    const handleEducationValue = (e, index) => {
        setEducationVal(prevState => {
            const updatedEducationVal = [...prevState];
            updatedEducationVal[index] = { ...updatedEducationVal[index], [e.target.name]: e.target.value };
            return updatedEducationVal;
        });
    }
    //Add Input elements for skills
    const addSkillInput = (e) => {
        e.preventDefault();
        setSkills([...skills, { showDeleteIcon: true }]);
    }

    const handleSkillValue = (e) => {
        setSkillVal([...skillVal, e.target.value]);
    }
    //Add Input elements for achievement
    const addAchievementInput = (e) => {
        e.preventDefault();
        const a_name = '';
        const a_descp = '';
        const showDeleteIcon = true;
        setAchievements([...achievements, { a_name, a_descp, showDeleteIcon }]);
    }
    const handleAchievementValue = (e, index) => {
        const { name, value } = e.target;
        setAchievementVal(prevState => {
            const updatedAchievements = [...prevState];
            updatedAchievements[index] = { ...updatedAchievements[index], [name]: value };
            return updatedAchievements;
        });
    };


    //Add Input elements for work experience
    const addWorkExperience = (e) => {
        e.preventDefault();
        const w_name = '', w_role = '', w_from = '', w_to = '', showDeleteIcon = true;
        setworkExperience([...workExperience, { w_name, w_role, w_from, w_to, showDeleteIcon }]);
    }

    const handleWorkExperience = (e, index) => {
        const { name, value } = e.target;
        setworkExperienceVal(prevState => {
            const updatedExperince = [...prevState];
            updatedExperince[index] = { ...updatedExperince[index], [name]: value };
            return updatedExperince;
        });
    };

    const handleSocialMedialChecked = (e) => {
        const { checked, value } = e.target;
        setSocailMediaChecked(preState => ({
            ...preState,
            [value]: checked
        }));
    }

    const handleWorking = (e, index) => {
        const { checked } = e.target;
        console.log("w_to", index);
        setworkExperienceVal(prevState => {
            const updatedExperince = [...prevState];
            updatedExperince[index] = { ...updatedExperince[index], w_to: new Date().toISOString().split('T')[0] };
            return updatedExperince;
        });
        setWorking(checked);
    }

    //handle experince or fresher
    const handleExperience = (e) => {
        const { value } = e.target;
        if (value == 'experienced') {
            setExperience(true);
        } else {
            setExperience(false);
        }
    }
    //handle delete
    const handleDeleteWorkExperience = (type, index) => {
        let filterdResult;
        switch (type) {
            case "workExperience":
                filterdResult = workExperience.filter((ele, eleIndex) => {
                    console.log(eleIndex);
                    return eleIndex != index
                });
                if (filterdResult.length > 0) {
                    setworkExperience(filterdResult);
                }
                break;
            case "projects":
                filterdResult = projects.filter((ele, eleIndex) => eleIndex != index);
                if (filterdResult.length > 0) {
                    setProjects(filterdResult);
                }
                break;
            case "education":
                filterdResult = education.filter((ele, eleIndex) => eleIndex != index);
                if (filterdResult.length > 0) {
                    setEducation(filterdResult);
                }
                break;
            case "achievements":
                filterdResult = achievements.filter((ele, eleIndex) => eleIndex != index);
                if (filterdResult.length > 0) {
                    setAchievements(filterdResult);
                }
                break;
            case "skills":
                filterdResult = skills.filter((ele, eleIndex) => eleIndex != index);
                if (filterdResult.length > 0) {
                    setSkills(filterdResult);
                }
                break;
            default:
                break;
        }


    }

    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const notify = (msg) => {
        return toast(msg);
    }
    useEffect(() => {
        try {
            if (isSubmit) {
                const sendFormData = async () => {
                    const res = await axios.post(`${API_URL}/resume/create`, { data: formData }, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    });
                    const resumeId = res.data.id;
                    // If file exists, upload it to /upload/file
                    if (file) {
                        const formDataToSend = new FormData();
                        formDataToSend.append('image', file);
                        formDataToSend.append('resumeId', resumeId);
                        let result = await axios.post(`${API_URL}/upload/file`, formDataToSend, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    }
                    notify(res.data.msg);
                    navigate(`/${template}/${resumeId}`);
                }
                sendFormData();
            }
        } catch (error) {
            notify("Error Occured");
        }
    }, [isSubmit, formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, email, mobile, address, portfolio, bio, linkedin_url, github_url } = singleInputVal;
        if (template == 'temp2' || template == 'temp3') {
            if (file == '') {
                console.log("Can't Submit");
                notify("Can't Submit");
                return;
            }
        }
        setFormData({ ...formData, fname, lname, email, address, mobile, portfolio, bio, linkedin_url, github_url, educationVal, projectVal, skillVal, achievementVal, isExperienced, isSocailMediaChecked, isWorking, workExperienceVal, template });
        setSubmit(true);
    }


    return (
        <>
            <div className="row mx-0 py-3 bg-light justify-content-end">
                <div className="col-12 p-5 border border-light bg-white">
                    <h5 className="py-3">Fill The Mandatroy Fields</h5>
                    <form className="add_details_form" onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">First Name</label>
                            <input type="text" className="form-control" name="fname" required onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Last Name</label>
                            <input type="text" className="form-control" name="lname" required onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Address</label>
                            <input type="text" className="form-control" name="address" required onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Mobile Number</label>
                            <input type="text" className="form-control" name="mobile" required onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Email Address</label>
                            <input type="text" className="form-control" name="email" required onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Portfolio / Website Url</label>
                            <input type="text" className="form-control" name="portfolio" onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Select Social Media Links</label><br></br>
                            <span className="ms-3"><input type="checkbox" className="" value="linkedin" onChange={handleSocialMedialChecked} /> Linkedin</span>
                            <span className="ms-3"><input type="checkbox" className="" value="github" onChange={handleSocialMedialChecked} /> Github</span>
                            {isSocailMediaChecked.linkedin && <input type="text" className="form-control my-2" required placeholder="Linkedin URL" name="linkedin_url" onChange={handleInput} />}
                            {isSocailMediaChecked.github && <input type="text" className="form-control my-2" required placeholder="Github URL" name="github_url" onChange={handleInput} />}
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Bio / Objective</label>
                            <textarea type="text" className="form-control" placeholder="Enter upto 100 characters only..." name="bio" onChange={handleInput} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="text-secondary" htmlFor="">Select : </label><br></br>
                            <span className="ms-3"><input type="radio" value="experienced" name="experience" onChange={handleExperience} /> Experienced</span>
                            <span className="ms-3"><input type="radio" value='fresher' name="experience" onChange={handleExperience} /> Freseher</span>
                        </div>


                        {isExperienced &&
                            <div className="form-group mt-3">
                                <label className="text-secondary" htmlFor="">Add Work Experience</label>
                                <div className="border p-3">
                                    {workExperience.map((ele, index) => {
                                        return (
                                            <div key={index}>
                                                <input type="text" className="form-control mt-2" name="w_name" required placeholder="Company Name " onBlur={(e) => handleWorkExperience(e, index)} />
                                                <input type="text" className="form-control mt-2" name="w_role" required placeholder="Role" onBlur={(e) => handleWorkExperience(e, index)} />
                                                <input type="text" className="form-control mt-2" name="w_descp" required placeholder="Roles & Responsibility" onBlur={(e) => handleWorkExperience(e, index)} />
                                                <span>From</span>
                                                <input type="date" className="form-control mt-2" name="w_from" placeholder="Start Date" onBlur={(e) => handleWorkExperience(e, index)} />
                                                {!isWorking && <>
                                                    <span>To</span>
                                                    <input type="date" className="form-control mt-2" name="w_to" placeholder="End Date" onChange={(e) => handleWorkExperience(e, index)} />
                                                </>}
                                                <input type="checkbox" className=" mt-2" name="isWorking" placeholder="Currently Working" onChange={(e) => handleWorking(e, index)} /><span> Working</span>
                                                {ele.showDeleteIcon && <div className="text-end">
                                                    <FaTrash className="text-danger" onClick={() => handleDeleteWorkExperience("workExperience", index)} />
                                                </div>}

                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mt-3 text-end">
                                    <button className="btn bg-theme" onClick={addWorkExperience}><FaPlus></FaPlus> Add More</button>
                                </div>
                            </div>
                        }

                        <div className="form-group mt-3">
                            <label>Education Details</label>
                            <div className="border p-3">
                                {education.map((ele, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="text" className="mt-3 form-control" required placeholder="Title" name="e_name" onBlur={(e) => handleEducationValue(e, index)} />
                                            <input type="text" className="mt-3 form-control" required placeholder="Enter percentage/cgpa" name="e_cgpa" onBlur={(e) => handleEducationValue(e, index)} />
                                            <input type="text" className="mt-3 form-control" required placeholder="Enter Institute Name" name="e_institue" onBlur={(e) => handleEducationValue(e, index)} />
                                            <input type="date" className="mt-3 form-control" required placeholder="Passed out Year" name="e_passing_year" onBlur={(e) => handleEducationValue(e, index)} />
                                            {ele.showDeleteIcon && <div className="text-end">
                                                <FaTrash className="text-danger" onClick={() => handleDeleteWorkExperience("education", index)} />
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 text-end">
                                <button className="btn bg-theme" onClick={addEducationInput}><FaPlus></FaPlus> Add More</button>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Projects</label>
                            <div className="border p-3">
                                {projects.map((ele, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="text" className="mt-3 form-control" placeholder="Name of the project" name="p_name" onBlur={(e) => handleProjectValue(e, index)} />
                                            <div className="mt-3">
                                                <textarea className="form-control" placeholder="Description..." name="p_descp" onBlur={(e) => handleProjectValue(e, index)} ></textarea>
                                            </div>
                                            {
                                                ele.showDeleteIcon && <div className="text-end">
                                                    <FaTrash className="text-danger" onClick={() => handleDeleteWorkExperience("projects", index)} />
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 text-end">
                                <button className="btn bg-theme" onClick={addProjectInput}><FaPlus></FaPlus> Add More</button>

                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Skills</label>
                            <div className="border p-3 skills_box">
                                {skills.map((skill, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="text" className="mt-2 form-control" required placeholder={`Enter Skill ${index + 1} `} onBlur={handleSkillValue} />
                                            {skill.showDeleteIcon && <div className="text-end">
                                                <FaTrash className="text-danger" onClick={() => handleDeleteWorkExperience("skills", index)} />
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 text-end">
                                <button className="btn bg-theme" onClick={addSkillInput}><FaPlus></FaPlus> Add More</button>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Achievements & Certifications</label>
                            <div className="border p-3">
                                {achievements.map((ele, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="text" className="form-control mt-2" name="a_name" placeholder="Achievement/Certificate Name" onBlur={(e) => handleAchievementValue(e, index)} />
                                            <div className="mt-3">
                                                <textarea className="form-control mt-2" placeholder="Description..." name='a_descp' onBlur={(e) => handleAchievementValue(e, index)}></textarea>
                                            </div>
                                            {ele.showDeleteIcon && <div className="text-end">
                                                <FaTrash className="text-danger" onClick={() => handleDeleteWorkExperience("achievements", index)} />
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 text-end">
                                <button className="btn bg-theme" onClick={addAchievementInput}><FaPlus></FaPlus> Add More</button>
                            </div>
                        </div>
                        {(template == 'template2' || template == 'template3') && <div className="form-group">
                            <label>Upload Your Image</label>
                            <label className="d-block text-secondary" htmlFor="file-input">
                                <FaCloudUploadAlt className="text-theme-color" size={80} />
                            </label>
                            <input type="file" name='image' id="file-input" style={{ display: 'none' }} className="form-control" onChange={handleFileInput} />
                        </div>}

                        <div className="mt-3">
                            <button className="btn bg-theme form-control">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddDetails;