import React from 'react';
import PropTypes from 'prop-types';

const StudentTableRow = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    );
};

StudentTableRow.propTypes = {

};

export default StudentTableRow;
