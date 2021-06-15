const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan');
const serverless = require("serverless-http");


require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


app.use(morgan('tiny'));
const usersRouter = require("../routes/users");
app.use("/.netlify/functions/api/v1/users", usersRouter);
const teacherRouter=require("../routes/teacher");
app.use("/.netlify/functions/api/v1/teacher",teacherRouter);
const gradeRouter=require("../routes/grade");
app.use("/.netlify/functions/api/v1/grades",gradeRouter);
const rateRouter=require("../routes/rate");
app.use("/.netlify/functions/api/v1/rates",rateRouter);
const studentsInGradeRouter=require("../routes/studentsInGrade");
app.use("/.netlify/functions/api/v1/studentsInGrade",studentsInGradeRouter);
const subjectRouter=require("../routes/subject");
app.use("/.netlify/functions/api/v1/subject",subjectRouter);
const classRouter=require("../routes/subjectClass");
app.use("/.netlify/functions/api/v1/class",classRouter);
const authentication = require("../routes/authentication");
app.use("/.netlify/functions/api/v1/auth", authentication);
const schoolYearRouter = require("../routes/schoolYear");
app.use("/.netlify/functions/api/v1/schoolYears", schoolYearRouter);
const categoryRouter = require("../routes/category");
app.use("/.netlify/functions/api/v1/category", categoryRouter);









module.exports = app;
module.exports.handler = serverless(app);











