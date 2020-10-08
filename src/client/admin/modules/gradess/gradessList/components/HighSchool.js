import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const HighSchool = ({high,openModal}) => {
    return (
        <div className="grade_form">
            <div className="grade_title">Гимназиален курс</div>
            <div className="grade_number_form">
                {
                    high.map((grade)=>(
                        <div className="grade_number"
                             onClick={()=>openModal(grade)}
                        >
                            {grade.grade}. клас
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

HighSchool.propTypes = {

};

export default HighSchool;
