import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../../../modules/layout/SideBar/SideBar";
import YearCreateContainer from "../../../modules/gradess/yearCreate/YearCreateContainer";

const YearCreatePage = props => {
    return (
        <div>
            <SideBar/>
            <YearCreateContainer/>
        </div>
    );
};

YearCreatePage.propTypes = {

};

export default YearCreatePage;
