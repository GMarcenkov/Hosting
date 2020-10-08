import React from "react";
import InitialSchool from "./components/InitialSchool";
import JuniorSchool from "./components/JuniorSchool";
import HighSchool from "./components/HighSchool";
import "./components/Grade.css";
import SubGradeModal from "./components/subGradeModal/SubGradeModal";
import axios from "axios";

class GradeListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialSchool: [],
      juniorSchool: [],
      highSchool: [],
      subGrades: [],
      grade: null,
      subGradeModalIsOpen: false,
      yearFrom: "",
      yearTo: ""
    };
  }
  componentDidMount() {
    this.handleGetSchoolYear();
  }
  handleGetSchoolYear = async () => {
    let year = {
      yearFrom: "",
      yearTo: ""
    };
    await axios
      .get(`http://localhost:5000/schoolYears/${this.props.yearFrom}`)
      .then(response => {
        year.yearFrom = response.data.yearFrom;
        year.yearTo = response.data.yearTo;
      })
      .catch(function(error) {
        console.log(error);
      });

    let initialSchool = [
      { grade: 1, grades: [] },
      { grade: 2, grades: [] },
      { grade: 3, grades: [] },
      { grade: 4, grades: [] }
    ];
    let juniorSchool = [
      { grade: 5, grades: [] },
      { grade: 6, grades: [] },
      { grade: 7, grades: [] }
    ];
    let highSchool = [
      { grade: 8, grades: [] },
      { grade: 9, grades: [] },
      { grade: 10, grades: [] },
      { grade: 11, grades: [] },
      { grade: 12, grades: [] }
    ];

    await axios
      .get(`http://localhost:5000/grades/year/${this.props.yearFrom}`)
      .then(response => {
        console.log("ss", response);
        this.setState({
          yearFrom: response.data.yearFrom,
          yearTo: response.data.yearTo
        });
        response.data.map(grade => {
          if (parseInt(grade.grade) > 0 && parseInt(grade.grade) < 5) {
            initialSchool.map(grd => {
              if (grd.grade === parseInt(grade.grade)) {
                grd.grades.push(grade);
              }
            });
          }
          if (parseInt(grade.grade) > 4 && parseInt(grade.grade) < 8) {
            juniorSchool.map(grd => {
              if (grd.grade === parseInt(grade.grade)) {
                grd.grades.push(grade);
              }
            });
          }
          if (parseInt(grade.grade) > 7 && parseInt(grade.grade) < 13) {
            highSchool.map(grd => {
              if (grd.grade === parseInt(grade.grade)) {
                grd.grades.push(grade);
              }
            });
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    initialSchool= initialSchool.filter(grd=>grd.grades.length!==0)
    juniorSchool= juniorSchool.filter(grd=>grd.grades.length!==0)
    highSchool= highSchool.filter(grd=>grd.grades.length!==0)
    this.setState({
      yearFrom: year.yearFrom,
      yearTo: year.yearTo,
      initialSchool: initialSchool,
      juniorSchool: juniorSchool,
      highSchool: highSchool
    });
    console.log(initialSchool);
  };
  handleOpenModal = grade => {
    const { subGradeModalIsOpen } = this.state;
    console.log(grade);
    if (subGradeModalIsOpen) {
      this.setState({
        subGradeModalIsOpen: false,
        subGrades: [],
        grade: []
      });
    } else {
      this.setState({
        subGradeModalIsOpen: true,
        grade: grade
      });
    }
  };

  render() {
    const {
      initialSchool,
      juniorSchool,
      highSchool,
      subGradeModalIsOpen,
      subGrades,
      grade,
      yearFrom,
      yearTo
    } = this.state;
    return (
      <div className="grade_container">
        <div className="year_grade_title">
          Учебна {yearFrom}/{yearTo} година
        </div>
        <InitialSchool
          initial={initialSchool}
          openModal={this.handleOpenModal}
        />
        <JuniorSchool junior={juniorSchool} openModal={this.handleOpenModal} />
        <HighSchool high={highSchool} openModal={this.handleOpenModal} />
        <SubGradeModal
          grade={grade}
          modalIsOpen={subGradeModalIsOpen}
          openModal={this.handleOpenModal}
        />
      </div>
    );
  }
}

GradeListContainer.propTypes = {};

export default GradeListContainer;
