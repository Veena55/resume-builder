const Resume = require("../models/Resume");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { ObjectId } = require('mongodb');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createResume = async (req, res) => {
    try {
        const { fname, lname, email, mobile, address, portfolio, bio, linkedin_url, github_url, isExperienced, workExperienceVal, educationVal, projectVal, skillVal, achievementVal, template } = req.body.data;
        // const userId = await User.findOne({ email });
        const userId = req.user.userId || req.user.sub;
        console.log(req.user);
        const resume = new Resume({
            userId, fname, lname, address, mobile, email, portfolio, bio, linkedin: linkedin_url, github: github_url, bio, isExperienced, experienced: workExperienceVal, education: educationVal, projects: projectVal, skills: skillVal, achievements: achievementVal, template
        });
        const result = await resume.save();
        console.log(result);
        if (result) {
            res.status(200).json({ id: result.id, "msg": "Data Save Successfully!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Something went wrong" });
    }

}

const getResumeDataById = async (req, res) => {
    try {
        const { temp_id } = req.params;
        const objectId = new ObjectId(temp_id);
        // const user_id = new ObjectId(req.user.id);
        const result = await Resume.findOne({ _id: objectId });
        if (result) {
            res.status(200).json({ result });
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token!" })
    }
}

const getResumeByUserId = async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.userId || req.user.sub);
        const result = await Resume.find({ userId: user_id });
        if (result) {
            res.status(200).json({ result });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid Token!" })
    }
}

const deleteResumeById = async (req, res) => {
    try {
        const tempId = new ObjectId(req.body.tempId);
        const result = await Resume.deleteOne({ _id: tempId });
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Can't be deleted" });
    }
}

module.exports = {
    createResume,
    getResumeDataById,
    getResumeByUserId,
    deleteResumeById
}
