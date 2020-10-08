import React from "react";
import PropTypes from "prop-types";
import YearCreate from "./YearCreate.module.css";
import AllGradeList from "./listAllGrades/AllGradeList";

const GradeListContainer = ({ grades,errors, handleTakeGrade }) => {
  return (
    <div className={YearCreate.year_list_container}>
      <div className={YearCreate.grade_list_form}>
        <div className={YearCreate.year_create_title}>Класове</div>
        {errors.grades && (
            <div className={YearCreate.error}>
              <span>{errors.grades}</span>
            </div>
        )}
        <div>
          <AllGradeList
            title={"Начален етап"}
            handleTakeGrade={handleTakeGrade}
            grades={grades}
            numbers={[1, 2, 3, 4]}
          />
        </div>
        <div>
          <AllGradeList
            handleTakeGrade={handleTakeGrade}
            title={"Прогимназия"}
            grades={grades}
            numbers={[5, 6, 7]}
          />
        </div>
        <div>
          <AllGradeList
            handleTakeGrade={handleTakeGrade}
            title={"Гимназиален курс"}
            grades={grades}
            numbers={[9, 10, 11, 12]}
          />
        </div>
      </div>
    </div>
  );
};

GradeListContainer.propTypes = {};

export default GradeListContainer;
