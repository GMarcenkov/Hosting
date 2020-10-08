import React from 'react';
import PropTypes from 'prop-types';


const StudentTableHead = ({children}) => {
    return (
        <thead className="table_head">
        {children}
        </thead>
    );
};

StudentTableHead.propTypes = {

};

export default StudentTableHead;
