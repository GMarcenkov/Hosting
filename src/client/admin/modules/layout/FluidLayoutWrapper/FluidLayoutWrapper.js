import React from 'react';
import './FluidLayouWrapper.css'

const FluidLayoutWrapper = ({children}) => {
    return (
        <div className="main_content">
            {children}
        </div>
    );
};

FluidLayoutWrapper.propTypes = {

};

export default FluidLayoutWrapper;
