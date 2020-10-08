import React from 'react';
import PropTypes from 'prop-types';

const SubjectTableHead = ({children}) => {
    return (
        <thead className="table_head">
        {children}
        </thead>
    );
};

SubjectTableHead.propTypes = {

};

export default SubjectTableHead;
