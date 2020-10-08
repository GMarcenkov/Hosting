const router = require("express").Router();
let User = require("../models/user/user.model");
let Grade = require("../models/grade/grade.model");
const auth = require("../middlewares/authenticate");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const secondName = req.body.secondName;
  const familyName = req.body.familyName;
  const email = req.body.email;
  const phone = req.body.phone;
  const isAdmin = req.body.isAdmin;

  const newUser = new User({
    username,
    password,
    name,
    secondName,
    familyName,
    email,
    phone,
    isAdmin
  });
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/grade/:userId").get((req, res) => {
  let grades = [];

  User.findById(req.params.userId)
    .then(user => {
      Promise.all(
        user.schoolYears.map(gradeId =>
          Grade.findById(gradeId).then(grade => {
            grades.push(grade);
          })
        )
      ).then(() => res.json(grades));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/username/:username").get((req, res) => {
  let students = [];
  User.find()
    .then(users => {
      users.map(user => {
        if (user.username.includes(req.params.username)) {
          students.push(user);
        }
      });
      res.json(students);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.password = req.body.password;
      user.schoolYears.push(req.body.year);
      user.date = Date.parse(req.body.date);
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/addSchoolYear/:id").put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.schoolYears.push(req.body.schoolYear);
      user
        .save()
        .then(() => res.json("User's schoolYear added!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/addSubject/:id/:year").put((req, res) => {
  let subject = {
    title: req.body.title,
    slug: req.body.slug,
    teacher: req.body.teacher,
    ratingsFirstHalf: [],
    rateFirstHalf: "",
    ratingsSecondHalf: [],
    rateSecondHalf: "",
    rateForYear: ""
  };
  User.findById(req.params.id)
    .then(user => {
      user.schoolYears.map(schoolYear => {
        if (schoolYear.yearFrom === req.params.year) {
          schoolYear.subjects.push(subject);
        }
      });

      user
        .save()
        .then(() => res.json(subject))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/deleteSchoolYear/:id").put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.schoolYears.filter(req.body.schoolYear);
      user
        .save()
        .then(() => res.json("User's schoolYear added!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
