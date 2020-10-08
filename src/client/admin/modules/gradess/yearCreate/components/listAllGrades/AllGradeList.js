import React from "react";
import PropTypes from "prop-types";
import Grade from "./AllGradeList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const AllGradeList = ({ title, numbers, grades, handleTakeGrade }) => {
  return (
    <div className={Grade.school_level}>
      <div className={Grade.grades_title}>{title}</div>
      <div>
        {numbers.map(number => (
          <div>
            <div className={Grade.grades_title}>{number}. клас</div>
            <table className={Grade.grade_level}>
              <tbody>
                {grades.map(grade =>
                    <React.Fragment>
                      {number === parseInt(grade.grade) ? (
                        <tr className={Grade.list_row}>
                          <td>
                            {grade.grade}{" "}
                            {grade.subGrade === "a" ? "А" : null}
                            {grade.subGrade === "b" ? "Б" : null}
                            {grade.subGrade === "v" ? "В" : null}
                            {grade.subGrade === "g" ? "Г" : null}
                            {grade.subGrade === "d" ? "Д" : null}
                            {grade.subGrade === "e" ? "Е" : null}
                          </td>
                          <td>{grade.teacher}</td>
                          <td>
                            <FontAwesomeIcon
                              onClick={() =>
                                handleTakeGrade(
                                    grade._id,
                                    grade.grade,
                                    grade.subGrade,
                                    grade.teacherId,
                                    grade.students
                                )
                              }
                              className={Grade.edit_icon}
                              icon={faEdit}
                            />
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

AllGradeList.propTypes = {};

export default AllGradeList;
