const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectClass = new Schema(
  {
      title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    gradeId: {
      type: String,
      required: true,
      trim: true
    },
      teacherId: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true
  }
);

const SubjectClass = mongoose.model("subjectClass", subjectClass);

module.exports = SubjectClass;
