import React from 'react';
import './UserTableHead.css'

const UsersTableHead = ({children}) => {
    return (
        <thead >
            {children}
        </thead>
    );
};

UsersTableHead.propTypes = {

};

export default UsersTableHead;
