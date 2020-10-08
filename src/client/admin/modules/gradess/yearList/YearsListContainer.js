import React from "react";
import "./components/YearsList.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class YearsListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      years: []
    };
  }
  componentDidMount() {
    this.handleGetYears()
  }
  handleGetYears = () => {
    axios
      .get("http://localhost:5000/schoolYears/")
      .then(response => {
        console.log("ss", response);
        this.setState({
          years: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="years_container">
        <div className="years_container_title">Година на обучение</div>
        <div className="years_list">
          {this.state.years.map(year => (
            <Link className="year_form" to={`/admincp/grades/${year._id}`}>
              <div className="year_banner">
                {year.yearFrom}/{year.yearTo}
              </div>
            </Link>
          ))}
          <Link className="year_form_add" to={`/admincp/year/create`}>
            <FontAwesomeIcon className="add_banner" icon={faPlus} />
          </Link>
        </div>
      </div>
    );
  }
}

YearsListContainer.propTypes = {};

export default YearsListContainer;
