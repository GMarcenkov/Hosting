import React from "react";
import YearCreate from "./Year.module.css";
import PropTypes from "prop-types";
import SubjectStyle from "../../../classCreate/components/SubjectCreate.module.css";

const Year = ({ years,yearId, handleInput,errors, handleCreateSchoolYear }) => {
  return (
    <div className={YearCreate.year_container}>
      <button
        className={YearCreate.button_create_year}
        onClick={() => handleCreateSchoolYear()}
      >
        Създай учебната година
      </button>
        <div>
            <div className={SubjectStyle.select_label}>Година на обучение</div>
            <select
                name="yearId"
                onChange={handleInput}
                className={SubjectStyle.select_year}
                value={yearId}
            >
                {years.map(year => (
                    <option value={year._id}>
                        {year.yearFrom}/{year.yearTo}
                    </option>
                ))}
            </select>
        </div>
      {/*<div>*/}
      {/*  <div>ОТ:</div>*/}
      {/*  <input*/}
      {/*    className={YearCreate.form_year}*/}
      {/*    name="yearFrom"*/}
      {/*    type="number"*/}
      {/*    onChange={handleInput}*/}
      {/*    value={yearFrom}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className={YearCreate.year_split}>/</div>*/}
      {/*<div className="form_body">*/}
      {/*  <div>ДО:</div>*/}
      {/*  <input*/}
      {/*      className={YearCreate.form_year}*/}
      {/*    name="yearTo"*/}
      {/*    type="number"*/}
      {/*    onChange={handleInput}*/}
      {/*    value={yearTo}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

Year.propTypes = {};

export default Year;
