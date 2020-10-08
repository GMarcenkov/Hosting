import React from "react";
import RatingTableRow from "./shared/ratingsTableRow/RatingTableRow";
import RatingsTableRowStyle from "./shared/ratingsTableRow/RatingTableRowStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const RatingsTableRow = ({
  student,
  handleInput,
  handleAddRate,
  handleTakeRates,
  indexOfStudent
}) => {
  return (
    <RatingTableRow>
      <td className={RatingsTableRowStyle.name}>
        {student.name} {student.secondName} {student.familyName}
      </td>
      <td className={RatingsTableRowStyle.egn}>{student.username}</td>
      <td className={RatingsTableRowStyle.rates}>
        {student.rating.ratingsFirstHalf.map((rate, index) => (
          <input
            onChange={event =>
              handleInput(event, index, indexOfStudent, "ratingsFirstHalf")
            }
            className={RatingsTableRowStyle.modal_input}
            value={rate}
          />
        ))}
        <FontAwesomeIcon
            onClick={()=>handleAddRate(indexOfStudent,'ratingsFirstHalf')}
          className={RatingsTableRowStyle.edit}
          icon={faPlusCircle}
        />
      </td>
      <td className={RatingsTableRowStyle.rate}>
        <input
          onChange={event =>
            handleInput(event, "", indexOfStudent, "rateFirstHalf")
          }
          className={RatingsTableRowStyle.modal_input}
          value={student.rating.rateFirstHalf}
        />
      </td>
      <td className={RatingsTableRowStyle.rates}>
        {student.rating.ratingsSecondHalf.map((rate, index) => (
          <input
            onChange={event =>
              handleInput(event, index, indexOfStudent, "ratingsSecondHalf")
            }
            className={RatingsTableRowStyle.modal_input}
            value={rate}
          />
        ))}
        <FontAwesomeIcon
            onClick={()=>handleAddRate(indexOfStudent,'ratingsSecondHalf')}
          className={RatingsTableRowStyle.edit}
          icon={faPlusCircle}
        />
      </td>
      <td className={RatingsTableRowStyle.rate}>
        <input
          onChange={event =>
            handleInput(event, "", indexOfStudent, "rateSecondHalf")
          }
          className={RatingsTableRowStyle.modal_input}
          value={student.rating.rateSecondHalf}
        />
      </td>
      <td className={RatingsTableRowStyle.rate}>
        <input
          onChange={event =>
            handleInput(event, "", indexOfStudent, "rateForYear")
          }
          className={RatingsTableRowStyle.modal_input}
          value={student.rating.rateForYear}
        />
      </td>
    </RatingTableRow>
  );
};

RatingsTableRow.propTypes = {};

export default RatingsTableRow;
