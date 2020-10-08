import React from 'react';
import PropTypes from 'prop-types';
import  './ModalLayoutWrapper.css'
const ModalLayoutWrapper = ({children}) => {
    return (
        <div className="modal_wrapper">
            <div className="row">
                <div className="col-lg-8"/>
                {children}
            </div>
        </div>
    );
};

ModalLayoutWrapper.propTypes = {

};

export default ModalLayoutWrapper;
