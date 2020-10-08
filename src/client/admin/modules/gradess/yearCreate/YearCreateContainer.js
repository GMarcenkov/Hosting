import React from "react";
import YearCreate from "./components/YearCreate.module.css";
import Year from "./components/year/Year";
import axios from "axios";
import CreateGradeContainer from "./components/CreateGradeContainer";
import GradeListContainer from "./components/GradeListContainer";

class YearCreateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editModel: false,
      editGrade: {},
      yearFrom: "",
      yearTo: "",
      yearId: "",
      years: [],
      gradeId: "",
      grade: 1,
      subGrade: "a",
      teacher: "",
      teachers: [],
      students: [],
      users: [],
      newUsers: [],
      addStudent: "",
      filterByName: false,
      search: [],
      teacherId: "",
      grades: [],
      request: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.handleGetUsers();
    this.handleGetYears();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.yearId !== prevState.yearId) {
      this.handleGetGrades();
    }
    if (this.state.username !== prevState.username) {
      this.handleGetUsers();
    }
    if (this.state.teacher !== prevState.teacher) {
      this.handleGetTeachers();
    }
  }

  validateFormCreateYear = () => {
    const { yearTo, yearFrom, grades } = this.state;
    let errors = {};
    if (yearTo.length < 4 || yearFrom.length < 4) {
      errors.year = "Моля, въведете година на обучение.";
    }
    if (grades.length < 1) {
      errors.grades = "Моля, създайте класове.";
    }
    return errors;
  };
  handleGetGrades = async () => {
    await axios
      .get(`http://localhost:5000/grades/year/${this.state.yearId}`)
      .then(response => {
        this.setState({ grades: response.data });
      })
      .catch(function(error) {});
  };
  handleGetYears = () => {
    axios
      .get(`http://localhost:5000/schoolYears/`)
      .then(response => {
        this.setState({ years: response.data, yearId: response.data[0]._id });
      })
      .catch(function(error) {});
  };
  validateFormCreateGrade = () => {
    const { students, teacher, grade, subGrade, grades } = this.state;
    let errors = {};

    if (students.length < 1) {
      errors.students = "Моля, добавете ученици.";
    }
    grades.map(grd => {
      if (grd.subGrade === subGrade && grd.grade === grade) {
        errors.students = `Вече има създаден ${grd.grade} ${grd.subGrade} клас!`;
      }
    });
    if (Object.values(teacher).filter(Boolean).length <= 0) {
      errors.teacher = "Моля, изберете класен ръководител.";
    }

    return errors;
  };
  handleInput = event => {
    this.setState({
      errors: {},
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  handleGetUsers = async () => {
    await axios
      .get(`http://localhost:5000/users/username/${this.state.username}`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {});
  };
  handleGetTeachers = async () => {
    await axios
      .get(`http://localhost:5000/teacher/username/${this.state.teacher}`)
      .then(response => {
        this.setState({
          teachers: response.data
        });
      })
      .catch(function(error) {});
  };
  handleSearch = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
    if (event.target.value.trim().length === 0) {
      this.setState({ search: [] });
      return;
    }
    if (this.state.filterByName) {
    } else {
      axios
        .get(
          `http://localhost:5000/users/username/${event.target.value.trim()}`
        )
        .then(response => {
          this.setState({ search: response.data });
        })
        .catch(function(error) {});
    }
  };
  handleChangeFilter = () => {
    if (this.state.filterByName) {
      this.setState({ filterByName: false });
    } else {
      this.setState({ filterByName: true });
    }
  };
  handleAddStudent = student => {
    let stu = [];
    this.state.students.push(student);
    this.state.students.map(student => {
      stu = this.state.users.filter(user => user._id !== student._id);
    });

    this.setState({ search: [], users: stu, addStudent: "" });
  };
  handleSelectTeacher = teacher => {
    let name=`${teacher.name}  ${teacher.familyName} - ${teacher.username}  `
    this.setState({ teachers: [], teacherId: teacher,teacher:name });
  };

  handleAddSchoolYearToStudent = (student, grade, subGrade, teacher) => {
    const { yearFrom, yearTo } = this.state;
    let schoolYear = {
      schoolYear: {
        yearFrom: yearFrom,
        yearTo: yearTo,
        teacher: teacher,
        grade: grade,
        subGrade: subGrade,
        subjects: []
      }
    };
    axios
      .put(
        `http://localhost:5000/users/addSchoolYear/${student._id}`,
        schoolYear
      )
      .then(() => {});
  };
  handleCreateGrade = async () => {
    const { teacherId, grade, subGrade, students, yearId, grades } = this.state;
    let studentsId = [];
    students.map(student => {
      studentsId.push(student._id);
    });

    const errors = this.validateFormCreateGrade();
    const isValid = Object.values(errors).filter(Boolean).length <= 0;
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    let NewGrade = {
      yearId: yearId,
      grade: parseInt(grade),
      subGrade: subGrade,
      teacherId: teacherId
    };
    let studentsInGrade = {
      gradeId: "",
      students: studentsId
    };
    await axios
      .post("http://localhost:5000/grades/add", NewGrade)
      .then(response => {
        studentsInGrade.gradeId = response.data._id;
        this.handleGetGrades();
      })
      .catch(e => {
        this.setState({ request: "Failed to create" });
      });
    await axios
      .post("http://localhost:5000/studentsInGrade/add", studentsInGrade)
      .then(this.handleGetGrades)
      .catch(e => {
        this.setState({ request: "Failed to create" });
      });
  };
  handleDeleteStudent = student => {
    const { students, users } = this.state;
    let newStudents = students.filter(stu => stu._id !== student._id);
    users.push(student);
    this.setState({ students: newStudents });
  };
  handleDeleteGrade = () => {
    axios
      .delete(`http://localhost:5000/grades/delete/${this.state.gradeId}`)
      .then(this.handleGetGrades);
    this.setState({ editModel: false });
  };
  handleTakeGrade = async (id, grade, subGrade, teacher) => {
    await axios
      .get(`http://localhost:5000/studentsInGrade/${id}`)
      .then(response => {
        this.setState({
          students: response.data,
          editModel: true
        });
      });
    this.setState({
      gradeId: id,
      grade: grade,
      subGrade: subGrade,
      teacher: teacher
    });
  };
  handleEditGrade = () => {
    const {
      teacher,
      grade,
      subGrade,
      students,
      grades,
      editGrade
    } = this.state;

    let NewGrade = {
      grade: parseInt(grade),
      subGrades: [
        {
          subGrade: subGrade,
          teacher: teacher,
          students: students
        }
      ]
    };
    let haveGrade = {
      subGrade: subGrade,
      teacher: teacher,
      students: students
    };
    let allGrades = grades;

    let index_of_grade = grades.findIndex(
      grade => grade.grade === editGrade.grade
    );
    let index_of_next_grade = grades.findIndex(
      grade => grade.grade === NewGrade.grade
    );

    if (editGrade.grade === NewGrade.grade && editGrade.subGrade === subGrade) {
      let forEdit = allGrades[index_of_grade].subGrades.filter(
        grade => grade.subGrade !== subGrade
      );

      allGrades[index_of_grade].subGrades = forEdit;

      allGrades[index_of_grade].subGrades.push(haveGrade);
      this.setState({
        grades: allGrades,
        editModel: false
      });
    } else {
      if (
        grades[index_of_next_grade].subGrades.filter(
          subGrade => subGrade.subGrade === haveGrade.subGrade
        ).length === 0
      ) {
        allGrades[index_of_grade].subGrades = allGrades[
          index_of_grade
        ].subGrades.filter(
          subGrades => subGrades.subGrade !== editGrade.subGrade
        );
        let forEdit = allGrades[index_of_grade].subGrades.filter(
          grade => grade.subGrade !== subGrade
        );

        allGrades[index_of_grade].subGrades = forEdit;

        allGrades[index_of_next_grade].subGrades.push(haveGrade);
        allGrades = allGrades.filter(grade => grade.subGrades.length !== 0);

        this.setState({
          grades: allGrades,
          editModel: false
        });
      }
      if (grades.filter(grade => grade.grade === NewGrade.grade).length === 0) {
        let forEdit = allGrades[index_of_grade].subGrades.filter(
          grade => grade.subGrade !== subGrade
        );
        allGrades[index_of_grade].subGrades = forEdit;
        allGrades.push(NewGrade);
        allGrades = allGrades.filter(grade => grade.subGrades.length !== 0);
        this.setState({
          grades: allGrades,
          editModel: false
        });
      }
    }
    this.setState({ students: [], teacher: "" });
    localStorage.setItem("schoolYear", JSON.stringify(this.state.grades));
  };
  handleClearState = () => {
    this.setState({
      students: [],
      grade: {},
      teacher: {},
      subGrade: {},
      editModel: false
    });
  };
  handleCreateSchoolYear = async () => {
    const { grades, yearFrom, yearTo } = this.state;

    const errors = this.validateFormCreateYear();
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      this.setState({ errors });
      return;
    }

    const year = {
      yearFrom: yearFrom,
      yearTo: yearTo,
      grades: grades.sort((a, b) => {
        return a.grade - b.grade;
      })
    };

    axios.post("http://localhost:5000/schoolYear/add", year).catch(e => {
      this.setState({ request: "Failed to create" });
    });

    await grades.map(grade => {
      grade.subGrades.map(subGrade => {
        subGrade.students.map(student => {
          this.handleAddSchoolYearToStudent(
            student,
            grade.grade,
            subGrade.subGrade,
            subGrade.teacher
          );
        });
      });
    });

    if (this.state.request === "") {
      window.location = "/admincp/years";
    }
  };
  render() {
    const {
      yearFrom,
      yearTo,
      teacher,
      grade,
      subGrade,
      students,
      users,
      addStudent,
      filterByName,
      search,
      grades,
      editModel,
      errors,
      years,
      yearId,
      teachers
    } = this.state;
    return (
      <div className={YearCreate.year_container}>
        <div className={YearCreate.year_title_border}>
          <div className={YearCreate.year_create_title}>
            Създаване на учебна година
          </div>
          <Year
            yearId={yearId}
            years={years}
            handleCreateSchoolYear={this.handleCreateSchoolYear}
            yearFrom={yearFrom}
            yearTo={yearTo}
            handleInput={this.handleInput}
            errors={errors}
          />
          {errors.year && (
            <div className={YearCreate.error}>
              <span>{errors.year}</span>
            </div>
          )}
        </div>
        <div className={YearCreate.year_holder}>
          <GradeListContainer
            errors={errors}
            grades={grades}
            handleTakeGrade={this.handleTakeGrade}
          />
          <CreateGradeContainer
            errors={errors}
            handleCreateGrade={this.handleCreateGrade}
            handleClearState={this.handleClearState}
            handleSelectTeacher={this.handleSelectTeacher}
            yearFrom={yearFrom}
            editModel={editModel}
            yearTo={yearTo}
            teacher={teacher}
            grade={grade}
            teachers={teachers}
            subGrade={subGrade}
            students={students}
            users={users}
            addStudent={addStudent}
            filterByName={filterByName}
            search={search}
            handleDeleteGrade={this.handleDeleteGrade}
            handleEditGrade={this.handleEditGrade}
            handleDeleteStudent={this.handleDeleteStudent}
            handleInput={this.handleInput}
            handleAddStudent={this.handleAddStudent}
            handleChangeFilter={this.handleChangeFilter}
            handleSearch={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}

YearCreateContainer.propTypes = {};

export default YearCreateContainer;
