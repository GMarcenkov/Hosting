const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan');
const serverless = require("serverless-http");
const socketio = require('socket.io');
const http = require('http');

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



const { addUser, removeUser, getUser, getUsersInRoom } = require('../routes/chat');


const server = http.createServer(app);
let io = socketio.listen(server, { serveClient: false });


app.use(cors());


io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name:`${name.name} ${name.familyName}`,nameId:name._id, room });

        if(error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'чат', text: `${user.name}, вие сте на линия.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message ,nameId:user.nameId});

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});


server.listen(PORT, console.log(`Server is starting at ${PORT}`));
// module.exports = app;
// module.exports.handler = serverless(app);











