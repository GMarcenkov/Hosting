import React from "react";
import PropTypes from "prop-types";
import RatingTableHead from "./shared/ratingTableHead/RatingTableHead";

const RatingsTableHeader = props => {
  return (
    <RatingTableHead>
      <tr>
        <th>Име</th>
        <th>ЕГН</th>
        <th>Оценки от Първи срок</th>
        <th>Оценка за I срок</th>
        <th>Оценки от Втори срок</th>
        <th>Оценка за II срок</th>
        <th>Оценка за годината</th>
      </tr>
    </RatingTableHead>
  );
};

RatingsTableHeader.propTypes = {};

export default RatingsTableHeader;
