import React from "react";
import PropTypes from "prop-types";
import YearCreate from "./YearCreate.module.css";
import Grade from "./createGrade/CreateGrade.module.css";
import CreateGrade from "./createGrade/CreateGrade";
import AddStudents from "./addStudents/AddStudents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const CreateGradeContainer = ({
  handleEditGrade,
  handleDeleteStudent,
  teacher,
  editModel,
  grade,
  subGrade,
  users,
  students,
                                teachers,
                                handleSelectTeacher,
  filterByName,
  addStudent,
  search,
  errors,
  handleAddStudent,
  handleInput,
  handleChangeFilter,
  handleSearch,
  handleCreateGrade,
  handleDeleteGrade,
  handleClearState
}) => {
  return (
    <div className={YearCreate.year_create_container}>
      {editModel ? (
        <div className={YearCreate.year_create_title_container}>
          <div className={YearCreate.back} >
            <FontAwesomeIcon icon={faLongArrowAltLeft} onClick={()=>handleClearState()} />
          </div>
          <div className={YearCreate.year_create_title}>
            Редактиране на клас
          </div>
        </div>
      ) : (
        <div className={YearCreate.year_create_title}>Създаване на клас</div>
      )}
      <div className={YearCreate.year_create_form}>
        <CreateGrade
          errors={errors}
          teachers={teachers}
          handleSelectTeacher={handleSelectTeacher}
          handleInput={handleInput}
          teacher={teacher}
          grade={grade}
          subGrade={subGrade}
          search={search}
        />
        <AddStudents
          handleDeleteStudent={handleDeleteStudent}
          users={users}
          students={students}
          handleAddStudent={handleAddStudent}
          handleChangeFilter={handleChangeFilter}
          handleSearch={handleSearch}
          addStudent={addStudent}
          filterByName={filterByName}
          search={search}
        />
        {errors.students && (
          <div className={YearCreate.error}>
            <span>{errors.students}</span>
          </div>
        )}
        <div>
          {editModel ? (
            <div className={Grade.button_edit_form}>
              <button
                className={Grade.edit_grade}
                onClick={() => handleEditGrade()}
              >
                Редактирай
              </button>
              <button
                className={Grade.delete_grade}
                onClick={() => handleDeleteGrade()}
              >
                Изтрий
              </button>
            </div>
          ) : (
            <div className={Grade.button_add_container}>
              <button
                className={Grade.add_grade}
                onClick={() => handleCreateGrade()}
              >
                Създай
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CreateGradeContainer.propTypes = {};

export default CreateGradeContainer;
