var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");

//get students
router.get("/", async function (req, res) {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get students by id
router.get("/:id", async function (req, res) {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//get student class by id
router.get("/student-class/:id", async function (req, res) {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json({ classRoom: student.classRoom });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//new student
router.post("/new", async function (req, res) {
    const student = new Student({
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        admission_number: req.body.admission_number,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });

    try {
        const savedStudent = await student.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "student created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a student password
router.patch("/:id/update_password", async function (req, res) {
    try {
        updatedStudent = await Student.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    password: await bcrypt.hash(req.body.password, 10)
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "password updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a team Wallet Amount
router.post("/:id/update_class", async function (req, res) {
    try {
        updatedStudent = await Student.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    classRoom: req.body.classRoom
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "class updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a student
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedStudent = await Student.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Student deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;