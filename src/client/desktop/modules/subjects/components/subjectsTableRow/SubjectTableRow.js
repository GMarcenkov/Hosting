import React from 'react';
import PropTypes from 'prop-types';

const SubjectTableRow = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    );
};

SubjectTableRow.propTypes = {

};

export default SubjectTableRow;
