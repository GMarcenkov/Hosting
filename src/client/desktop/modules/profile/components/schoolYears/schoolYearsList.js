import React from "react";
import PropTypes from "prop-types";
import Years from "./Years.module.css";
import { Link } from "react-router-dom";

const SchoolYearsList = ({ years }) => {
  return (
    <div className={Years.school_years_container}>
      <div className={Years.title}>Учебни години</div>
      <div className={Years.years_list_container}>
        {years.map(year => (
          <Link to={`/subjects/${year._id}`}>
            <div className={Years.year_banner}>
              <div className={Years.year}>
                {year.grade} {year.subGrade === "a" ? "А" : null}
                {year.subGrade === "b" ? "Б" : null}
                {year.subGrade === "v" ? "В" : null}
                {year.subGrade === "g" ? "Г" : null}
                {year.subGrade === "d" ? "Д" : null}
                {year.subGrade === "e" ? "Е" : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

SchoolYearsList.propTypes = {};

export default SchoolYearsList;
