import React from 'react';
import './ProductTableHead.css'

const RatingTableHead = ({children}) => {
    return (
        <thead className="table_head">
            {children}
        </thead>
    );
};

RatingTableHead.propTypes = {

};

export default RatingTableHead;
