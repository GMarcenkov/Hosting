import React from "react";
import PropTypes from "prop-types";
import NavBar from "../../modules/layout/navBar/NavBar";
import "../../modules/layout/Wrapper/LayoutWrapper.css";
import ProfileContainer from "../../modules/profile/ProfileContainer";
import jwt_decode from "jwt-decode";

const HomePage = props => {
    let user;
    if (localStorage.getItem("jwt")) {
        user = jwt_decode(localStorage.getItem("jwt"));
    }else{
        user=null
    }
    if(user===null){
        (window.location.href = "/login")
    }
  return (
    <div>
      <NavBar />
        {
            user===null?null:<ProfileContainer />
        }

    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
