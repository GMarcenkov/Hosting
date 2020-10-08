import React from "react";
import PropTypes from "prop-types";
import SideBar from "../../../modules/layout/SideBar/SideBar";
import RatingListContainer from "../../../modules/gradess/ratingList/RatingListContainer";

const RatingPage = props => {
  return (
    <div>
      <SideBar />
      <RatingListContainer
        subjectId={props.computedMatch.params.id}
      />

    </div>
  );
};

RatingPage.propTypes = {};

export default RatingPage;
