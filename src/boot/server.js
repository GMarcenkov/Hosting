'use strict';
const mongoose = require("mongoose");
let express = require('express'),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    env = require('./env'),
    // modules = require('./modules'),
    // containers = require('./containers'),
    // drivers = require('./drivers'),
    // version = require('../server/lib/version'),
    // proxy = require('./proxy'),
    // multer = require('./multer'),
    // back=require('./../src/server/server'),
    app = express();

// app.set('ENV', env);
// app.set('VERSION', new version());


// app.set('views', './src/client/views');
// app.set('views engine', 'ejs');

/** Loads proxy server */
// proxy(app);

/** Take care of HTTP headers to secure the app */
app.use(helmet());

/** parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));

/** parse application/json */
app.use(bodyParser.json());

/** parse cookies */
app.use(cookieParser());

/** Loads logger on development mode */
/** Loads multer */
// multer(app);


/** Loads sendgrid */

/** Loads containers */
// containers(app);

/** Loads drivers */
// drivers(app);

/**
 * Load static files on development mode.
 * When on production is better to be used the front web server for serving the static files.
 */
if (env.isDevelopment) {
    app.use(express.static('public'));
}

/** Loads modules */
// modules(app);

/** Loads error middleware */
// app.use('/', errorMiddleware);


module.exports = {
    app: app,
    beforeLoad: () => {
        return new Promise(resolve => {
            return resolve(app);
        });
    },
    load: () => {
        return new Promise(resolve => {
            let server = app.listen(env.vars.SERVER_PORT, () => {
                return resolve(app);
            });
            mongoose.connect(process.env.ATLAS_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            const connection = mongoose.connection;
            connection.once("open", () => {
                console.log("MongoDB database connection established successfully");
            });

            const usersRouter = require("../server/routes/users");
            app.use("/api/v1/users", usersRouter);
            // const teacherRouter=require("./routes/teacher");
            // app.use("/teacher",teacherRouter);
            // const gradeRouter=require("./routes/grade");
            // app.use("/grades",gradeRouter);
            // const rateRouter=require("./routes/rate");
            // app.use("/rates",rateRouter);
            // const studentsInGradeRouter=require("./routes/studentsInGrade");
            // app.use("/studentsInGrade",studentsInGradeRouter);
            // const subjectRouter=require("./routes/subject");
            // app.use("/subject",subjectRouter);
            // const classRouter=require("./routes/subjectClass");
            // app.use("/class",classRouter);
            // const authentication = require("./routes/authentication");
            // app.use("/auth", authentication);
            // const schoolYearRouter = require("./routes/schoolYear");
            // app.use("/schoolYears", schoolYearRouter);
            // const categoryRouter = require("./routes/category");
            // app.use("/category", categoryRouter);

            if (process.env.NODE_ENV === 'production') {
                app.use(express.static('build'));
            }

            /** Sets max timeout */
            server.setTimeout(Number(env.vars.SERVER_TIMEOUT));
        });
    }
};
