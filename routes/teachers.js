var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Teacher = require("../models/teacher");
const verifyToken = require("../middleware/verify-token");

//get teachers
router.get("/", async function (req, res) {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get teachers by id
router.get("/:id", async function (req, res) {
    try {
        const teacher = await Teacher.findById(req.params.id);
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new teacher
router.post("/new", async function (req, res) {
    const teacher = new Teacher({
        name: req.body.name,
        yoj: req.body.yoj,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        zoomLink: req.body.zoomLink
    });

    try {
        const savedTeacher = await teacher.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "teacher created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a teacher password
router.patch("/:id/update_password", async function (req, res) {
    try {
        updatedTeacher = await Teacher.updateOne(
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
router.post("/:id/update_link", async function (req, res) {
    try {
        updatedTeacher = await Teacher.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    zoomLink: req.body.zoomLink
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "link updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a teacher
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedTeacher = await Teacher.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Teacher deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;