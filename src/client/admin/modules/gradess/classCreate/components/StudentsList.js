import React from "react";
import PropTypes from "prop-types";
import StudentsTableHeader from "../../yearCreate/components/addStudents/components/StudentsTableHeader";
import StudentsTableRow from "../../yearCreate/components/addStudents/components/StudentsTableRow";

const StudentsList = ({ students }) => {
  return (
    <div>
      <div style={{ "margin-top": "100px" }}>
        Учащи
        <table>
          <StudentsTableHeader />

          <tbody>
            {students !== undefined
              ? students.map(student => (
                  <StudentsTableRow student={student} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

StudentsList.propTypes = {};

export default StudentsList;
