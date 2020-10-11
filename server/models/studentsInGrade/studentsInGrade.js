const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentsInGradeSchema = new Schema(
    {
        gradeId: {
            type: String,
            required: true,
            trim: true,
        },
        students: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const StudentsInGrade = mongoose.model("studentsInGradeSchema", studentsInGradeSchema);

module.exports = StudentsInGrade;
