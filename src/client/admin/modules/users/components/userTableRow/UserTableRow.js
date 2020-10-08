import React from 'react';
import PropTypes from 'prop-types';
import './UserTableRow.css'

const UserTableRow = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    );
};

UserTableRow.propTypes = {

};

export default UserTableRow;
