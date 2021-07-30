var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

//import models
const Class = require("../models/class");
const verifyToken = require("../middleware/verify-token");

//get classrooms
router.get("/", async function (req, res) {
    try {
        const classrooms = await Class.find();
        res.status(200).json(classrooms);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get classrooms by id
router.get("/:id", async function (req, res) {
    try {
        const classroom = await Class.findById(req.params.id);
        res.status(200).json(classroom);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new classroom
router.post("/new", async function (req, res) {
    const classroom = new Class({
        class: req.body.class,
        section: req.body.section,
        key: req.body.key,
        password: req.body.password
    });

    try {
        const savedClass = await classroom.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "classroom created" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update a classroom password
router.patch("/:id/update_password", async function (req, res) {
    try {
        updatedClass = await Class.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    password: req.body.password
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

//update a class
router.post("/:id/update_link", async function (req, res) {
    try {
        updatedClass = await Class.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    class: req.body.class,
                    section: req.body.section,
                    key: req.body.key,
                    password: req.body.password
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

//delete a classroom
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedClass = await Class.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Class deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;