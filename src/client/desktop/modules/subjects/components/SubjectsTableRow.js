import React from "react";
import PropTypes from "prop-types";
import SubjectTableRow from "./subjectsTableRow/SubjectTableRow";
import Header from "./subjectsTableRow/SubjectTableRow.module.css";

const SubjectsTableRow = ({ schoolYear, subject }) => {
  return (
    <SubjectTableRow>
      <td className={Header.subject_title}>{subject.title}</td>
      <td className={Header.teacher}>
        {subject.teacher.name} {subject.teacher.familyName}
      </td>
      <td className={Header.term}>{subject.rate.ratingsFirstHalf + " "}</td>
      <td className={Header.half}>{subject.rate.rateFirstHalf}</td>
      <td className={Header.term}>{subject.rate.ratingsSecondHalf + " "}</td>
      <td className={Header.half}>{subject.rate.rateSecondHalf}</td>
      <td className={Header.finalRate}>{subject.rate.rateForYear}</td>
    </SubjectTableRow>
  );
};

SubjectsTableRow.propTypes = {};

export default SubjectsTableRow;
