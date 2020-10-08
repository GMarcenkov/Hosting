import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile.module.css";

const ProfileInfo = ({ user }) => {
  return (
    <div className={Profile.profile_container}>
      <FontAwesomeIcon className={Profile.user_icon} icon={faUserCircle} />
      <div className={Profile.user_info_container}>
        <div className={Profile.user_name_container}>
          <div className={Profile.user_names}>{user.name}</div>
          <div className={Profile.user_names}>{user.secondName}</div>
          <div className={Profile.user_names}>{user.familyName}</div>
        </div>
        <div className={Profile.user_communication}>
          <div className={Profile.user_label}>Телефон:</div>
          <div className={Profile.user_names}>{user.phone}</div>
        </div>
        <div className={Profile.user_communication}>
          <div className={Profile.user_label}>Имейл:</div>
          <div className={Profile.user_names}>{user.email}</div>
        </div>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {};

export default ProfileInfo;
