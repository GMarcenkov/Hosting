const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolYearSchema = new Schema(
  {
    yearFrom: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    yearTo: {
      type: String,
      required: true,
      trim: true,
      minlength: 4
    },
    grades: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const schoolYear = mongoose.model("schoolYear", schoolYearSchema);

module.exports = schoolYear;
