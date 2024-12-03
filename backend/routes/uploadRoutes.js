const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const checkAuth = require('../middlewares/checkAuth');
const { ObjectId } = require('mongodb');
const Resume = require('../models/Resume');

router.post('/file', checkAuth, (req, res) => {
    console.log("hello");
    upload(req, res,
        async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
            }
            if (req.file == undefined) {
                console.log(req, "hjhjhj");
                return res.status(400).json({ message: 'No file selected!' });
            }

            const resumeId = new ObjectId(req.body.resumeId);
            console.log("upload", req.body.resumeId);
            const result = await Resume.updateOne({ _id: resumeId }, { image: req.file.filename });
            console.log(result);
            if (result.acknowledged) {
                res.status(200).json({
                    message: "File saved successfully",
                    file: `uploads/${req.file.filename}`
                });
            }
        })
});

module.exports = router;