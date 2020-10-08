import React from "react";
import PropTypes from "prop-types";
import SubjectStyle from "./SubjectCreate.module.css";

const SubjectSelect = ({ subjects, subject, handleInput,grade }) => {
  return (
    <div>
      <div className={SubjectStyle.select_label}>Наименование на предмета</div>
      <select
        name="subject"
        onChange={handleInput}
        className={SubjectStyle.select_subject}
        value={subject._id}
      >
        {
           subjects.length>0?subjects.map(subject => (
          <option value={subject._id}>{subject.title}</option>
        )):null}
      </select>
    </div>
  );
};

SubjectSelect.propTypes = {};

export default SubjectSelect;
