import React from "react";
import PropTypes from "prop-types";
import UsersContainer from "../../modules/users/UsersContainer";
import SideBar from "../../modules/layout/SideBar/SideBar";
const UsersPage = props => {
  return (
    <div>
      <SideBar />
      <UsersContainer />
    </div>
  );
};

UsersPage.propTypes = {};

export default UsersPage;
