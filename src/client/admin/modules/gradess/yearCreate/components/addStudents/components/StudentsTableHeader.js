import React from 'react';
import PropTypes from 'prop-types';
import StudentTableHead from "./studentsTableHead/studentTableHead";

const StudentsTableHeader= props => {
    return (
        <StudentTableHead>
            <tr>
                <th>Име</th>
                <th>Презиме</th>
                <th>Фамилия</th>
                <th>ЕГН</th>
                <th>Телефон</th>
                <th>Имейл</th>
            </tr>
        </StudentTableHead>
    );
};

StudentsTableHeader.propTypes = {

};

export default StudentsTableHeader;
