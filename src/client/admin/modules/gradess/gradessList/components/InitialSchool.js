import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const InitialSchool = ({initial,openModal}) => {
    return (
        <div className="grade_form">
            <div className="grade_title">Начален етап</div>
            <div className="grade_number_form">
                {
                    initial.map((grade)=>(
                        <div className="grade_number"
                             onClick={()=>openModal(grade)}
                              // to={`${window.location.pathname}/${grade}`}
                        >
                            {grade.grade}. клас
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

InitialSchool.propTypes = {

};

export default InitialSchool;
