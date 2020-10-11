const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const grades = new Schema(
    {
        yearId: {
            type: String,
            trim: true,
        },
        teacherId: {
            type: String,
            trim: true,

        },
        grade: {
            type: String,
            required: true,
            trim: true,
        },
        subGrade: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

const Grade = mongoose.model("Grade", grades);

module.exports = Grade;
