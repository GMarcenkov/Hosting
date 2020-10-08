import React from "react";
import PropTypes from "prop-types";
import SubjectStyle from "./SubjectCreate.module.css";

const TeacherSelect = ({teacher,teachers,handleInput}) => {
  return (
      <div>
          <div className={SubjectStyle.select_label}>Преподавател</div>
          <select
              name="subject"
              onChange={handleInput}
              className={SubjectStyle.select_teacher}
              value={teacher}
          >
              {teachers.map(teacher => (
                  <option value={teacher._id}>{teacher.name}{" "}{teacher.familyName}{" - "}{teacher.username}</option>
              ))}
          </select>
      </div>
  );
};

TeacherSelect.propTypes = {};

export default TeacherSelect;
