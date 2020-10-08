import React from "react";
import "../Grade.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SubGradeModal = ({ modalIsOpen, openModal, grade }) => {
  return (
    <div>
      {modalIsOpen ? (
        <div className="modal_wrapper">
          <div className="modal_container">
            <div className="modal_close_button" onClick={() => openModal()}>
              X
            </div>
            <div className="modal_subGrade_title">Изберете клас</div>
            <div className="modal_subGrade_form_content">
              <table>
                <tbody>
                  {grade.grades.map(grade => (
                    <Link to={`/admincp/grade/${grade._id}`}>
                      <tr className="modal_subGrade_row">
                        <td>
                          {grade.grade} - {grade.subGrade === "a" ? "А" : null}
                          {grade.subGrade === "b" ? "Б" : null}
                          {grade.subGrade === "v" ? "В" : null}
                          {grade.subGrade === "g" ? "Г" : null}
                          {grade.subGrade === "d" ? "Д" : null}
                          {grade.subGrade === "e" ? "Е" : null}
                        </td>
                        <td>{grade.teacher}</td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

SubGradeModal.propTypes = {};

export default SubGradeModal;
