import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../../../modules/layout/SideBar/SideBar";
import YearsListContainer from "../../../modules/gradess/yearList/YearsListContainer";
import GradeListContainer from "../../../modules/gradess/gradessList/GradeListContainer";

const GradePage = props => {
    return (
            <div>
                <SideBar/>
                <GradeListContainer yearFrom={props.computedMatch.params.year}/>
            </div>
    );
};

GradePage.propTypes = {

};

export default GradePage;
