import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../../../modules/layout/SideBar/SideBar";
import YearsListContainer from "../../../modules/gradess/yearList/YearsListContainer";

const YearsPage = props => {
    return (
        <div>
            <SideBar/>
            <YearsListContainer/>
        </div>
    );
};

YearsPage.propTypes = {

};

export default YearsPage;
