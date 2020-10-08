import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './ModalLayoutCloseButton.css'

const ModalLayoutCloseButton = ({onClick}) => {
    return (
        <FontAwesomeIcon
            className="close_modal"
            onClick={onClick}
            icon={faTimes}/>
    );
};

ModalLayoutCloseButton.propTypes = {

};

export default ModalLayoutCloseButton;
