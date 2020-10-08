import React from "react";
import PropTypes from "prop-types";
import SubjectCardStyle from "./Subject.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const SubjectCard = ({ subject }) => {
  return (
      <Link to={`/admincp/rating/${subject._id}`} className={SubjectCardStyle.subject_card}>
          <FontAwesomeIcon
              icon={faFolder}
              className={SubjectCardStyle.icon}
          />
              <div className={SubjectCardStyle.card_title}>
                  <div className={SubjectCardStyle.subject}>
                      {subject.title}
                  </div>
                  <div className={SubjectCardStyle.teacher}>
                      <div style={{"text-align":"left"}}>
                          преподавател:
                      </div>
                          {subject.teacher.name}{" "}{subject.teacher.familyName}
                  </div>
              </div>
      </Link>

  );
};

SubjectCard.propTypes = {};

export default SubjectCard;
