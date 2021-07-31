var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Submission = require("../models/submission");
const verifyToken = require("../middleware/verify-token");

//get submissions
router.get("/", async function (req, res) {
    try {
        const submissions = await Submission.find();
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get submissions by id
router.get("/:id", async function (req, res) {
    try {
        const submission = await Submission.findById(req.params.id);
        res.status(200).json(submission);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



//new submission
router.post("/new", async function (req, res) {
    const submission = new Submission({
        assignment: req.body.assignment,
        student: req.body.student,
        fileURL: req.body.fileURL,
        subject: req.body.subject,
        timeStamp: req.body.timeStamp
    });

    try {
        const savedSubmission = await submission.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "submission created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a submission password
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedSubmission = await Submission.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: true
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "submission disabled" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a submission
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedSubmission = await Submission.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Submission deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;