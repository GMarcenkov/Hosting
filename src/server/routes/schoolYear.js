const router = require("express").Router();
let SchoolYear = require("../models/schoolYear/schoolYear.model");

router.route("/").get((req, res) => {
  SchoolYear.find()
    .then(grade => res.json(grade))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/years").get((req, res) => {
  SchoolYear.find()
    .then(grades =>
      res.json(
        grades.map(grade => ({
          _id: grade._id,
          yearFrom: grade.yearFrom,
          yearTo: grade.yearTo
        }))
      )
    )
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const grades = req.body.grades;
  const yearFrom = req.body.yearFrom;
  const yearTo = req.body.yearTo;
  const newClass = new SchoolYear({
    grades,
    yearFrom,
    yearTo
  });

  newClass
    .save()
    .then(() => res.json(newClass))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  SchoolYear.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:year/:grade/:subGrade").get((req, res) => {
  SchoolYear.findOne({
    yearFrom: req.params.year,
    grade: req.params.grade,
    subGrade: req.params.subGrade
  })
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/findByYear/:year").get((req, res) => {
  SchoolYear.findOne({ yearFrom: req.params.year })
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  SchoolYear.findByIdAndDelete(req.params.id)
    .then(() => res.json("SchoolYear deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/update/:id").put((req, res) => {
//     SchoolYear.findById(req.params.id)
//     .then(subjectCard => {
//       subjectCard.title = req.body.title;
//       subjectCard.students = req.body.students;
//       subjectCard.quantity = req.body.quantity;
//       subjectCard.years = req.body.years;
//       subjectCard.teacher = req.body.teacher;
//       subjectCard.slug = req.body.slug;
//       subjectCard.date = Date.parse(req.body.date);
//       subjectCard
//         .save()
//         .then(() => res.json(product))
//         .catch(err => res.status(400).json("Error: " + err));
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });
module.exports = router;
