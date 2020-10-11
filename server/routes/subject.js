const router = require("express").Router();
let Subject = require("../models/subject/subject.model");
const auth = require("../middlewares/authenticate");

router.route("/").get((req, res) => {
  Subject.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const grades = req.body.grades;

  const newSubject = new Subject({
    title,
    grades
  });
  newSubject
    .save()
    .then(() => res.json(newSubject))
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/:id").get((req, res) => {
  Subject.findById(req.params.id)
    .then(subject => res.json(subject))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/grade/:grade").get((req, res) => {
  let subj = [];

  Subject.find()
    .then(subjects => {
      subjects.map(subject => {
        if (
          subject.grades.filter(grade => grade === parseInt(req.params.grade))
            .length > 0
        ) {
          subj.push(subject);
        }
      });
      res.json(subj);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Subject.findByIdAndDelete(req.params.id)
    .then(() => res.json("subject deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").put((req, res) => {
  Subject.findById(req.params.id)
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
