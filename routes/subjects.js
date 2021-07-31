var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Subject = require("../models/subject");
const verifyToken = require("../middleware/verify-token");

//get subjects
router.get("/", async function (req, res) {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get subjects by id
router.get("/:id", async function (req, res) {
    try {
        const subject = await Subject.findById(req.params.id);
        res.status(200).json(subject);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



//new subject
router.post("/new", async function (req, res) {
    const subject = new Subject({
        subjectName: req.body.subjectName,
        status:true
    });

    try {
        const savedSubject = await subject.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "subject created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a subject password
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedSubject = await Subject.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: false
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "subject disabled" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a subject
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedSubject = await Subject.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Subject deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;