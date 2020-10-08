import React from 'react';
import  './RecordButton.css';

const RecordButton = ({title,onClick}) => {
    return (
        <button className="button_style" onClick={onClick}>
            {title}
        </button>
    );
};

RecordButton.propTypes = {

};

export default RecordButton;
