const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./server/routes/users");
app.use("/users", usersRouter);
const teacherRouter=require("./server/routes/teacher");
app.use("/teacher",teacherRouter);
const gradeRouter=require("./server/routes/grade");
app.use("/grades",gradeRouter);
const rateRouter=require("./server/routes/rate");
app.use("/rates",rateRouter);
const studentsInGradeRouter=require("./server/routes/studentsInGrade");
app.use("/studentsInGrade",studentsInGradeRouter);
const subjectRouter=require("./server/routes/subject");
app.use("/subject",subjectRouter);
const classRouter=require("./server/routes/subjectClass");
app.use("/class",classRouter);
const authentication = require("./server/routes/authentication");
app.use("/auth", authentication);
const schoolYearRouter = require("./server/routes/schoolYear");
app.use("/schoolYears", schoolYearRouter);
const categoryRouter = require("./server/routes/category");
app.use("/category", categoryRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
module.exports = app;
