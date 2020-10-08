const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        grades:{
            type: Array,
            required: true,
        }
    }

);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
