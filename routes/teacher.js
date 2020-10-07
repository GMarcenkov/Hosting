const router = require("express").Router();
let Teacher = require("../models/teacher/teacher.model");
const auth = require("../middlewares/authenticate");

router.route("/").get((req, res) => {
  Teacher.find()
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
  const subjectsId = req.body.subjectsId;
  const gradesId = req.body.gradesId;
  const newTeacher = new Teacher({
    username,
    password,
    name,
    secondName,
    familyName,
    email,
    phone,
    isAdmin,
    subjectsId,
    gradesId
  });
  newTeacher
    .save()
    .then(() => res.json(newTeacher))
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/:id").get((req, res) => {
  Teacher.findById(req.params.id)
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/username/:username").get((req, res) => {
    let students = [];
    Teacher.find()
        .then(teachers => {
            teachers.map(teacher => {
                if (teacher.username.includes(req.params.username)) {
                    students.push(teacher);
                }
            });
            res.json(students);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/subject/:id").get((req, res) => {
  let teach = [];

  Teacher.find()
    .then(teachers => {
      teachers.map(teacher => {
        if (
          teacher.subjectsId.filter(
            subjectId => subjectId._id === req.params.id
          ).length > 0
        ) {
          teach.push(teacher);
        }
      });
      res.json(teach);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/grade/:id").get((req, res) => {
  let teach = [];

  Teacher.find()
    .then(teachers => {
      teachers.map(teacher => {
        if (
          teacher.gradesId.filter(
              gradesId => gradesId === req.params.id
          ).length > 0
        ) {
          teach.push(teacher);
        }
      });
      res.json(teach);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").put((req, res) => {
  Teacher.findById(req.params.id)
    .then(teacher => {
      teacher.username = req.body.username;
      teacher.password = req.body.password;
      teacher.gradesId.push(req.body.gradesId);
      teacher.date = Date.parse(req.body.date);
      teacher
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
