const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rate = new Schema(
  {
    userId: {
      type: String,
      trim: true
    },
      subjectId: {
          type: String,
          trim: true
      },
      gradeId: {
          type: String,
          trim: true
      },
    ratingsFirstHalf: {
      type: Array,
      trim: true
    },
    rateFirstHalf: {
      type: String,
      trim: true
    },
    ratingsSecondHalf: {
      type: Array,
      trim: true
    },
    rateSecondHalf: {
      type: String,
      trim: true
    },
    rateForYear: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Rate = mongoose.model("Rate", rate);

module.exports = Rate;
