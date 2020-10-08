import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "./studentsTableRow/StudentTableRow.css";
import StudentTableRow from "./studentsTableRow/StudentTableRow";

const StudentsTableRow = ({ student, handleDeleteStudent }) => {
  return (
    <StudentTableRow>
      <td className="stu_name">{student.name}</td>
      <td className="stu_secondName">{student.secondName}</td>
      <td className="stu_familyName">{student.familyName}</td>
      <td className="stu_pin">{student.username}</td>
      <td className="stu_phone">{student.phone}</td>
      <td className="stu_email">{student.email}</td>
    </StudentTableRow>
  );
};

StudentsTableRow.propTypes = {};

export default StudentsTableRow;
