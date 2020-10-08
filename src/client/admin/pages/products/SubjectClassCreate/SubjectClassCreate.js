import React from "react";
import PropTypes from "prop-types";
import SideBar from "../../../modules/layout/SideBar/SideBar";
import ClassCreateContainer from "../../../modules/gradess/classCreate/ClassCreateContainer";

const SubjectClassCreate = props => {
  return (
    <div>
      <SideBar />
      <ClassCreateContainer />
    </div>
  );
};

SubjectClassCreate.propTypes = {};

export default SubjectClassCreate;
