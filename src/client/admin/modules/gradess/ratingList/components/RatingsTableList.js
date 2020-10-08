import React from "react";
import FluidLayoutWrapper from "../../../layout/FluidLayoutWrapper/FluidLayoutWrapper";
import RatingsTableHeader from "./RatingsTableHeader";
import FluidLayoutBody from "../../../layout/FluidLayouBody/FluidLayoutBody.js";
import RatingsTableRow from "./RatingsTableRow";

const RatingsTableList = ({ products, deleteProduct,handleAddRate,edit,handleInput,students,handleTakeRates }) => {
  return (
    <FluidLayoutWrapper>
      <FluidLayoutBody>
        <table>
          <RatingsTableHeader />
          <tbody>
            {students.map((student,index) => {
              return (
                <RatingsTableRow
                    handleAddRate={handleAddRate}
                    indexOfStudent={index}
                    edit={edit}
                    handleInput={handleInput}
                    handleTakeRates={handleTakeRates}
                    student={student}
                />
              );
            })}
          </tbody>
        </table>
      </FluidLayoutBody>
    </FluidLayoutWrapper>
  );
};

RatingsTableList.propTypes = {};

export default RatingsTableList;
