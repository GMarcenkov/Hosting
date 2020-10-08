const router = require("express").Router();
let SubjectClass = require("../models/class/class.model");
let Rate=require("../models/rate/rate.model")
const auth = require("../middlewares/authenticate");

router.route("/").get((req, res) => {
  SubjectClass.find()
    .then(classes =>res.json(classes))
    .catch(err => res.status(400).json("Error: " + err));

});

router.route("/add").post((req, res) => {
  const gradeId = req.body.gradeId;
  const title = req.body.title;
  const teacherId = req.body.teacherId;

  const newSubject = new SubjectClass({
    gradeId,
      title,
      teacherId
  });
  newSubject
    .save()
    .then(() => res.json(newSubject))
    .catch(err => {
      res.status(400).json("Error: " + err);
    });

    req.body.students.map(student=>{
        const userId = student;
        const subjectId = newSubject._id;
        const ratingsFirstHalf = [""];
        const rateFirstHalf = "";
        const ratingsSecondHalf = [""];
        const rateSecondHalf = "";
        const rateForYear = "";
        const gradeId = req.body.gradeId;

        const newRate = new Rate({
            subjectId,
            userId,
            ratingsFirstHalf,
            rateFirstHalf,
            ratingsSecondHalf,
            rateSecondHalf,
            rateForYear,
            gradeId
        });
        newRate
            .save()
            .then(() => {})
            .catch(err => {
                res.status(400).json("Error: " + err);
            });
    })
});

router.route("/:id").get((req, res) => {
  SubjectClass.findById(req.params.id)
    .then(subject => res.json(subject))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/grade/:gradeId").get((req, res) => {
  SubjectClass.find({
      gradeId:req.params.gradeId
  })
    .then(subject => res.json(subject))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  SubjectClass.findByIdAndDelete(req.params.id)
    .then(() => res.json("subject deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").put((req, res) => {
  SubjectClass.findById(req.params.id)
    .then(subject => {
      subject.title = req.body.title;
      subject.grades = req.body.grades;
      subject.date = Date.parse(req.body.date);
      subject
        .save()
        .then(() => res.json("subject updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
