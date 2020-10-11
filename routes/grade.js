const router = require("express").Router();
let Grade = require("../models/grade/grade.model");
const auth = require("../middlewares/authenticate");


router.route("/").get((req, res) => {
    Grade.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const yearId = req.body.yearId;
    const teacherId = req.body.teacherId;
    const grade = req.body.grade;
    const subGrade = req.body.subGrade;
    const newGrade = new Grade({
        subGrade,
        yearId,
        teacherId,
        grade,
    });
    newGrade
        .save()
        .then(() => res.json(newGrade))
        .catch(err => {
            res.status(400).json("Error: " + err);
        });
});

router.route("/:id").get((req, res) => {
    Grade.findById(req.params.id)
        .then(grade => res.json(grade))
        .catch(err => res.status(400).json("Error: " + err));
});
router.route("/year/:yearId").get((req, res) => {
    Grade.find({yearId:req.params.yearId})
        .then(grade => res.json(grade))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
    Grade.findByIdAndDelete(req.params.id)
        .then(() => res.json("Grade deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").put((req, res) => {
    Grade.findById(req.params.id)
        .then(grade => {
            grade.yearFrom = req.body.yearFrom;
            grade.yearTo = req.body.yearTo;
            grade.teacherId = req.body.teacherId;
            grade.grade = req.body.grade;
            grade.students = req.body.students;
            grade.date = Date.parse(req.body.date);
            grade
                .save()
                .then(() => res.json("grade updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
