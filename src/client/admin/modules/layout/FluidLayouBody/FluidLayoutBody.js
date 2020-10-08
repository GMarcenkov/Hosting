import React from 'react';
import PropTypes from 'prop-types';
import  './FluidLayoutBody'

const FluidLayoutBody = ({children}) => {
    return (
        <div className="table_responsive">
            {children}
        </div>
    );
};

FluidLayoutBody.propTypes = {

};

export default FluidLayoutBody;
