const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

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

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const teacherRouter=require("./routes/teacher");
app.use("/teacher",teacherRouter);
const gradeRouter=require("./routes/grade");
app.use("/grades",gradeRouter);
const rateRouter=require("./routes/rate");
app.use("/rates",rateRouter);
const studentsInGradeRouter=require("./routes/studentsInGrade");
app.use("/studentsInGrade",studentsInGradeRouter);
const subjectRouter=require("./routes/subject");
app.use("/subject",subjectRouter);
const classRouter=require("./routes/subjectClass");
app.use("/class",classRouter);
const authentication = require("./routes/authentication");
app.use("/auth", authentication);
const schoolYearRouter = require("./routes/schoolYear");
app.use("/schoolYears", schoolYearRouter);
const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
