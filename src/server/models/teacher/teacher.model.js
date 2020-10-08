const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        secondName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        familyName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            minlength: 3
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
            minlength: 3
        },
        isAdmin: {
            value:true,
            type: Boolean,
            required: true
        },
        subjectsId:{
            type:Array,
            required:true
        },
        gradesId:{
            type:Array
        }
    },
    {
        timestamps: true
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
