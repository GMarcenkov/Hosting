import React from "react";
import PropTypes from "prop-types";
import SubjectStyle from "./SubjectCreate.module.css";

const GradeSelect = ({ grade, handleInput, subGrade, subGrades, grades }) => {
  return (
    <div>
      <div className={SubjectStyle.select_label}>Изберете клас</div>
      <select
        name="grade"
        onChange={handleInput}
        className={SubjectStyle.select_grade}
        value={grade.grade}
      >
        {grades.map(grade => (
          <option value={ grade.grade }>{grade.grade} клас</option>
        ))}
      </select>
      <select
        name="subGrade"
        onChange={handleInput}
        className={SubjectStyle.select_subGrade}
        value={subGrade.subGrade}
      >
        {grade.grade !== undefined
          ? grade.grades.map(grade => (
              <option value={grade.subGrade}>
                {grade.subGrade === "a" ? "А" : null}
                {grade.subGrade === "b" ? "Б" : null}
                {grade.subGrade === "v" ? "В" : null}
                {grade.subGrade === "g" ? "Г" : null}
                {grade.subGrade === "d" ? "Д" : null}
                {grade.subGrade === "e" ? "Е" : null}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

GradeSelect.propTypes = {};

export default GradeSelect;
