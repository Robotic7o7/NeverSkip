var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Assignment = require("../models/assignment");
const verifyToken = require("../middleware/verify-token");

//get assignments
router.get("/", async function (req, res) {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get assignments by id
router.get("/:id", async function (req, res) {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get assignments by class ID
router.get("/class/:id", async function (req, res) {
    try {
        const assignments = await Assignment.find({ classAssigned: req.params.id});
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get assignments by subject ID
router.get("/subject/:id", async function (req, res) {
    try {
        const assignments = await Assignment.find({ subject: req.params.id});
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get assignments by teacher ID
router.get("/teacher/:id", async function (req, res) {
    try {
        const assignments = await Assignment.find({ teacherAssigned: req.params.id});
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//new assignment
router.post("/new", async function (req, res) {
    const assignment = new Assignment({
        assignment_name: req.body.assignment_name,
        due_date: req.body.due_date,
        teacherAssigned: req.body.teacherAssigned,
        classAssigned: req.body.classAssigned,
        subject: req.body.subject,
        questions: req.body.questions
    });

    try {
        const savedAssignment = await assignment.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "assignment created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a assignment password
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedAssignment = await Assignment.updateOne(
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
            .json({ message: "success", additional_info: "assignment disabled" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a assignment
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedAssignment = await Assignment.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Assignment deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;