import React from 'react';
import './RatingTableRowStyle.module.css'

const RatingTableRow = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    );
};

RatingTableRow.propTypes = {

};

export default RatingTableRow;
