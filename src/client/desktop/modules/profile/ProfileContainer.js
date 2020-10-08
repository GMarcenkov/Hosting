import ProfileInfo from "./components/profileInfo/ProfileInfo";
import React from "react";
import SchoolYearsList from "./components/schoolYears/schoolYearsList";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Profile from "./components/ProfileContainer.module.css";


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      years: [
      ]
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }
  handleGetUser = async () => {

    let user = jwt_decode(localStorage.getItem("jwt"));
      axios
          .get(`http://localhost:5000/users/grade/${user.id}`)
          .then(response => {
              let years = response.data.filter(year=>year!==null)
            this.setState({years:years});
          })
          .catch(function(error) {})
    await axios
      .get(`http://localhost:5000/users/${user.id}`)
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(function(error) {});
  };
  render() {
    const { user, years } = this.state;
    return (
      <div className={Profile.profileContainer_holder}>
        <ProfileInfo user={user} />

        <SchoolYearsList years={years} />
      </div>
    );
  }
}

ProfileContainer.propTypes = {};

export default ProfileContainer;
