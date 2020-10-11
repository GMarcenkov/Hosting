const router = require("express").Router();
let StudentsInGrade = require("../models/studentsInGrade/studentsInGrade");
let User = require("../models/user/user.model");

router.route("/").get((req, res) => {
  StudentsInGrade.find()
    .then(grade => res.json(grade))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  const students = req.body.students;
  const yearId = req.body.yearId;
  const gradeId = req.body.gradeId;

  const newClass = new StudentsInGrade({
    students,
    yearId,
    gradeId
  });

  newClass
    .save()
    .then(() => res.json(newClass))
    .catch(err => res.status(400).json("Error: " + err));

  students.map(student=>{
      User.findById(student)
          .then(user => {
              user.schoolYears.push(req.body.gradeId)
              user.date = Date.parse(req.body.date);
              user
                  .save()
                  .then(() => res.json("User updated!"))
                  .catch(err => res.status(400).json("Error: " + err));
          })
          .catch(err => res.status(400).json("Error: " + err));
  })


});
router.route("/:id").get((req, res) => {
  let Students = [];

  StudentsInGrade.findOne({ gradeId: req.params.id })
    .then(grade => {
      Promise.all(
        grade.students.map(student =>
          User.findById(student).then(user => {
            Students.push(user);
          })
        )
      ).then(() => res.json(Students));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
