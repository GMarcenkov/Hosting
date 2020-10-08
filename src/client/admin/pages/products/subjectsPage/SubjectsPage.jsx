import React from "react";
import PropTypes from "prop-types";
import SideBar from "../../../modules/layout/SideBar/SideBar";
import ProductEditContainer from "../../../modules/gradess/productEdit/ProductEditContainer";
import SubjectsListContainer from "../../../modules/gradess/subjectsList/SubjectsListContainer";

const SubjectsPage = props => {
  return (
    <div>
      <SideBar />
      <SubjectsListContainer
        year={props.computedMatch.params.year}
        grade={props.computedMatch.params.grade}
      />
    </div>
  );
};

SubjectsPage.propTypes = {};

export default SubjectsPage;
