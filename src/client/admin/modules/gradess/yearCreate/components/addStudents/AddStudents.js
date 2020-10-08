import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import Add from "./AddStudents.module.css";
import StudentsTableHeader from "./components/StudentsTableHeader";
import StudentsTableRow from "./components/StudentsTableRow";
import Grade from "../createGrade/CreateGrade.module.css";
const AddStudents = ({
  students,
  users,
  handleAddStudent,
  handleChangeFilter,
  handleSearch,
  addStudent,
  filterByName,
  search,
  handleDeleteStudent
}) => {
  return (
    <div className={Add.search_form}>
      <div className={Add.input_title}>Добави ученици:</div>
      <div className={Add.search_container}>
        <input
          className={Add.input_content}
          placeholder="Търси ученик"
          name="addStudent"
          type="text"
          onChange={handleSearch}
          value={addStudent}
        />
        <div>
          <div className={Add.checkBox} onClick={() => handleChangeFilter()}>
            {filterByName ? (
              <FontAwesomeIcon
                icon={faSquare}
                onClick={() => handleChangeFilter()}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheckSquare}
                onClick={() => handleChangeFilter()}
              />
            )}
            <label className={Add.checkBox_title}>Търси по ЕГН</label>
          </div>
          <div className={Add.checkBox} onClick={() => handleChangeFilter()}>
            {filterByName ? (
              <FontAwesomeIcon
                icon={faCheckSquare}
                onClick={() => handleChangeFilter()}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquare}
                onClick={() => handleChangeFilter()}
              />
            )}
            <label className={Add.checkBox_title}>
              Търси по Име,Презиме,Фамилия
            </label>
          </div>
        </div>
      </div>
      <div>
        <table>
          <tbody>
            {search.map(stu => (
              <tr className={Add.search_row}>
                <td>{stu.name}</td>
                <td>{stu.secondName}</td>
                <td>{stu.familyName}</td>
                <td>{stu.username}</td>
                <td>
                  <button
                    className={Add.stu_add}
                    onClick={() => handleAddStudent(stu)}
                  >
                    Добави
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={Add.students_container}>
        <label className={Add.input_title}>Ученици</label>
        <div>
          <table>
            <StudentsTableHeader />
            <tbody>
              {students.map(student => (
                <StudentsTableRow
                  student={student}
                  handleDeleteStudent={handleDeleteStudent}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

AddStudents.propTypes = {};

export default AddStudents;
