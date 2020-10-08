import React from "react";
import axios from "axios";
import RatingsTableList from "./components/RatingsTableList";
import "./createProduct.css";
import { Link } from "react-router-dom";
import EditModal from "./components/editModal/EditModal";

class RatingListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: {},
      modalIsOpen: false,
      students: []
    };
  }
  componentDidMount() {
    this.handleGetStudents();
  }
  handleInput = (event, index, indexOfStudent, subject) => {
    const { edit, students } = this.state;

    if (subject === "ratingsFirstHalf") {
      students[indexOfStudent].rating.ratingsFirstHalf.fill(
        event.target.value,
        index,
        index + 1
      );
    }
    if (subject === "ratingsSecondHalf") {
      students[indexOfStudent].rating.ratingsSecondHalf.fill(
        event.target.value,
        index,
        index + 1
      );
    }
    if (subject === "rateSecondHalf") {
      students[indexOfStudent].rating.rateSecondHalf = event.target.value;
    }
    if (subject === "rateForYear") {
      students[indexOfStudent].rating.rateForYear = event.target.value;
    }
    if (subject === "rateFirstHalf") {
      students[indexOfStudent].rating.rateFirstHalf = event.target.value;
    }
    this.setState({
      ...this.state.edit,
      [event.target.name]: event.target.value
    });

    let FirstHalf = [];
    let SecondHalf=[];
    if (
      students[indexOfStudent].rating.ratingsFirstHalf.length ===
      students[indexOfStudent].rating.ratingsFirstHalf.filter(
        rate => rate.length === 0
      ).length
    ) {
      FirstHalf = [""];
    } else {
      FirstHalf = students[indexOfStudent].rating.ratingsFirstHalf.filter(
          rate => rate.length > 0
      );
    }
      if (
          students[
              indexOfStudent
              ].rating.ratingsSecondHalf.length ===
          students[
              indexOfStudent
              ].rating.ratingsSecondHalf.filter(rate => rate.length === 0).length
      ) {
        SecondHalf = [""];
      } else {
        SecondHalf =  students[
            indexOfStudent
            ].rating.ratingsSecondHalf.filter(rate => rate.length > 0);

    }
    let rating = {
      ratingsFirstHalf: FirstHalf,
      rateFirstHalf: students[indexOfStudent].rating.rateFirstHalf,
      ratingsSecondHalf:SecondHalf,
      rateSecondHalf: students[indexOfStudent].rating.rateSecondHalf,
      rateForYear: students[indexOfStudent].rating.rateForYear
    };
    axios
      .put(
        `http://localhost:5000/rates/edit/${students[indexOfStudent].rating._id}`,
        rating
      )
      .then(response => {})
      .catch(function(error) {});
    this.setState({});
  };
  handleTakeRates = (indexOfStudent, rates, title, subject) => {
    this.setState({
      modalIsOpen: true,
      edit: {
        indexOfStudent: indexOfStudent,
        rates: rates,
        title: title,
        subject: subject
      }
    });
  };
  handleAddRate = (indexOfStudent, subject) => {
    const { students } = this.state;
    if (subject === "ratingsSecondHalf") {
      students[indexOfStudent].rating.ratingsSecondHalf.push("");
    }
    if (subject === "ratingsFirstHalf") {
      students[indexOfStudent].rating.ratingsFirstHalf.push("");
    }
    this.setState({});
  };
  handleOpenModal = () => {
    const { modalIsOpen } = this.state;
    modalIsOpen
      ? this.setState({ modalIsOpen: false })
      : this.setState({ modalIsOpen: true });
  };
  handleGetStudents = async () => {
    let gradeId = "";
    await axios
      .get(`http://localhost:5000/class/${this.props.subjectId}`)
      .then(response => {
        gradeId = response.data.gradeId;
      })
      .catch(function(error) {});

    let students = [];
    let ratings = [];
    await axios
      .get(`http://localhost:5000/studentsInGrade/${gradeId}`)
      .then(response => {
        students = response.data;
      })
      .catch(function(error) {});

    await axios
      .get(
        `http://localhost:5000/rates/subject/${this.props.subjectId}/${gradeId}`
      )
      .then(response => {
        ratings = response.data;
      })
      .catch(function(error) {});

    await students.map(student => {
      ratings.map(rate => {
        if (student._id === rate.userId) {
          student.rating = rate;
        }
      });
    });
    this.setState({
      students: students
    });
  };

  render() {
    const { products, students, edit, modalIsOpen } = this.state;
    return (
      <div>
        <div className="createProduct">
          <Link to="/admincp/product/create">Създай продукт</Link>
        </div>
        <RatingsTableList
          edit={edit}
          handleInput={this.handleInput}
          handleTakeRates={this.handleTakeRates}
          handleAddRate={this.handleAddRate}
          students={students}
          products={products}
        />
        <EditModal
          handleInput={this.handleInput}
          edit={edit}
          modalIsOpen={modalIsOpen}
          openModal={this.handleOpenModal}
        />
      </div>
    );
  }
}

RatingListContainer.propTypes = {};

export default RatingListContainer;
