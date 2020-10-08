import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const JuniorSchool = ({ junior, openModal }) => {
  return (
    <div className="grade_form">
      <div className="grade_title">Прогимназия</div>
      <div className="grade_number_form">
        {junior.map(( grade ) => (
          <div className="grade_number" onClick={() => openModal(grade)}>
            {grade.grade}. клас
          </div>
        ))}
      </div>
    </div>
  );
};

JuniorSchool.propTypes = {};

export default JuniorSchool;
