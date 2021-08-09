var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//middleware
const verifyToken = require("../middleware/verify-token");

//models
const Student = require("../models/student");
const Teacher = require("../models/teacher");


//student login
router.post("/student/login", async function (req, res) {
    try {
        const student = await Student.findOne({ email: req.body.email });

        if (!student) {
            res.status(400).json({
                message: "failed",
                additional_info: "invalid email"
            });
        } else if (await bcrypt.compare(req.body.password, student.password)) {
            jwt.sign(
                { student_id: student._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        res.status(403).json(err);
                    } else {
                        res.status(200).json({ token: token, student_id: student._id, dob:student.dob, email:student.email, name: student.name, gender: student.gender, admission_number: student.admission_number, classRoom:student.classRoom });
                    }
                }
            );
        } else {
            res.status(403).json({
                message: "failed",
                additional_info: "invalid password"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

//student login
router.post("/teacher/login", async function (req, res) {
    try {
        const teacher = await Teacher.findOne({ email: req.body.email });

        if (!teacher) {
            res.status(400).json({
                message: "failed",
                additional_info: "invalid email"
            });
        } else if (await bcrypt.compare(req.body.password, teacher.password)) {
            jwt.sign(
                { teacher_id: teacher._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        res.status(403).json(err);
                    } else {
                        res.status(200).json({ token: token, teacher_id: teacher._id, name: teacher.name, yearofJoin:teacher.yoj, zoomLink: teacher.zoomLink });
                    }
                }
            );
        } else {
            res.status(403).json({
                message: "failed",
                additional_info: "invalid password"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});


//buyer check auth
router.post("/student/check", verifyToken, function (req, res) {
    if (!req.auth) {
        res.status(403).json({ error: err });
    } else {
        res
            .status(200)
            .json({ message: "success", additional_info: "the authToken is valid" });
    }
});


module.exports = router;