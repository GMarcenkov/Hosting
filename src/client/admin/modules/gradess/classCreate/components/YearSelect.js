import React from "react";
import PropTypes from "prop-types";
import SubjectStyle from "./SubjectCreate.module.css";

const YearSelect = ({ handleInput, years, year }) => {
  return (
    <div>
      <div className={SubjectStyle.select_label}>Година на обучение</div>
      <select
        name="year"
        onChange={handleInput}
        className={SubjectStyle.select_year}
        value={year._id}
      >
        {years.map(year => (
          <option value={year._id}>
            {year.yearFrom}/{year.yearTo}
          </option>
        ))}
      </select>
    </div>
  );
};

YearSelect.propTypes = {};

export default YearSelect;
