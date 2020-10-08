import React from "react";
import axios from "axios";
import "./components/SubjectCreate.module.css";
import slugify from "slugify";
import Loader from "react-loader-spinner";
import SubjectSelect from "./components/SubjectSelect";
import TeacherSelect from "./components/TeacherSelect";
import YearSelect from "./components/YearSelect";
import SubjectStyle from "./components/SubjectCreate.module.css";
import GradeSelect from "./components/GradeSelect";
import StudentsList from "./components/StudentsList";
class ClassCreateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterByName: false,
      subjects: [],
      subject: {},
      years: [],
      year: "",
      grades: [],
      grade: {},
      subGrade: {},
      teachers: [],
      students: [],
      teacher: {},
      isLoading: {
        year: true,
        grade: true,
        subject: true,
        teacher: true,
        students: true
      },
      errors: {},
      error: ""
    };
  }

  componentDidMount() {
    this.handleGetYears();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.year !== prevState.year) {
      this.handleGetYears();
    }
    if (this.state.grade.grade !== prevState.grade.grade) {
      this.handleGetSubjects();
    }
    if (this.state.subject !== undefined && prevState.subject !== undefined) {
      if (this.state.subject._id !== prevState.subject._id) {
        this.handleGetTeachers();
      }
    }
    if (this.state.subGrade._id !== prevState.subGrade._id) {
      this.handleGetStudents(this.state.subGrade._id);
    }
  }

  handleInput = event => {
    if (event.target.name === "subGrade") {
      let subGrade = this.state.grade.grades.filter(
        grade => grade.subGrade === event.target.value
      );
      this.setState({
        subGrade: subGrade[0]
      });
      return;
    }

    if (event.target.name === "grade") {
      let grade = this.state.grades.filter(
        grade => grade.grade === parseInt(event.target.value)
      );

      this.setState({
        grade: grade[0],
        subGrade: grade[0].grades[0]
      });
      return;
    }

    if (event.target.name === "subject") {
      let subject = this.state.subjects.filter(
        subject => subject._id === event.target.value
      );
      this.setState({
        subject: subject[0]
      });
      return;
    }

    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  handleGetYears = () => {
    let yearId = "";
    axios
      .get("http://localhost:5000/schoolYears/")
      .then(response => {
        this.setState({
          years: response.data
        });
        if (this.state.year === "") {
          yearId = response.data[0]._id;
          this.setState({
            year: response.data[0],
            isLoading: {
              ...this.state.isLoading,
              year: false
            }
          });
        }
        this.handleGetGrades(yearId);
      })
      .catch(function(error) {});
  };
  handleGetGrades = async yearId => {
    let grades = [
      { grade: 1, grades: [] },
      { grade: 2, grades: [] },
      { grade: 3, grades: [] },
      { grade: 4, grades: [] },
      { grade: 5, grades: [] },
      { grade: 6, grades: [] },
      { grade: 7, grades: [] },
      { grade: 8, grades: [] },
      { grade: 9, grades: [] },
      { grade: 10, grades: [] },
      { grade: 11, grades: [] },
      { grade: 12, grades: [] }
    ];
    await axios
      .get(`http://localhost:5000/grades/${yearId}`)
      .then(response => {
        response.data.map(grade => {
          grades.map(grd => {
            if (parseInt(grade.grade) === grd.grade) {
              grd.grades.push(grade);
            }
          });
        });
        grades = grades.filter(grade => grade.grades.length > 0);
        this.setState({
          grades: grades,
          grade: grades[0],
          subGrade: grades[0].grades[0],
          isLoading: {
            ...this.state.isLoading,
            grade: false
          }
        });
        this.handleGetStudents(grades[0].grades[0]._id);
        this.handleGetSubjects();
      })
      .catch(function(error) {});
  };
  handleGetSubjects = async () => {
    if (this.state.grade.grade !== undefined) {
      await axios
        .get(`http://localhost:5000/subject/grade/${this.state.grade.grade}`)
        .then(response => {
          this.setState({ subjects: response.data });
          if (this.state.subject._id === undefined) {
            this.setState({
              subject: response.data[0],
              isLoading: {
                ...this.state.isLoading,
                subject: false
              }
            });
          }
        })
        .catch(function(error) {});
      this.handleGetTeachers();
    }
  };

  handleGetTeachers = async () => {
    if (this.state.subject !== undefined) {
      await axios
        .get(`http://localhost:5000/teacher/subject/${this.state.subject._id}`)
        .then(response => {
          this.setState({
            teachers: response.data,
            isLoading: {
              ...this.state.isLoading,
              teacher: false
            }
          });
          if (this.state.teacher._id === undefined) {
            this.setState({
              teacher: response.data[0],
              isLoading: {
                ...this.state.isLoading,
                teacher: false
              }
            });
          }
        })
        .catch(function(error) {});
    }
  };
  handleGetStudents = async gradeId => {
    await axios
      .get(`http://localhost:5000/studentsInGrade/${gradeId}`)
      .then(response => {
        this.setState({
          students: response.data,
          isLoading: {
            ...this.state.isLoading,
            students: false
          }
        });
      })
      .catch(function(error) {});
  };
  handleSubmit = async () => {
    const { subject, teacher, subGrade, year, students } = this.state;
    let studentsId = [];
    students.map(stu => {
      studentsId.push(stu._id);
    });
    const Class = {
      teacherId: teacher._id,
      slug: slugify(subject.title, { lower: true, remove: /[():.@><,_{}]/g }),
      title: subject.title,
      gradeId: subGrade._id,
      students: studentsId
    };

    let teacherEdit = {
      gradesId: subGrade._id,
      username: teacher.username,
      password: teacher.password
    };
    await axios
      .post(`http://localhost:5000/class/add`, Class)
      .then(
        axios
          .put(`http://localhost:5000/teacher/edit/${teacher._id}`, teacherEdit)
          .catch(error => {})
      )
      .catch(error => {});
  };
  render() {
    const {
      teacher,
      students,
      yearFrom,
      yearTo,
      grade,
      grades,
      years,
      year,
      subGrades,
      subGrade,
      subjects,
      subject,
      teachers,
      errors,
      handleChangeFilter
    } = this.state;
    if (Object.values(this.state.isLoading).filter(Boolean).length > 0) {
      return (
        <div className={SubjectStyle.loader}>
          <Loader
            type="ThreeDots"
            color="#125899"
            height={400}
            width={700}
            timeout={300000} //3 secs
          />
        </div>
      );
    }
    return (
      <div className={SubjectStyle.subject_container}>
        <div className={SubjectStyle.subject_holder}>
          <div className={SubjectStyle.title}>
            Създаване на клас по учебен предмет
          </div>
          <div className={SubjectStyle.subject_row}>
            <YearSelect
              handleInput={this.handleInput}
              years={years}
              year={year}
            />
            <GradeSelect
              handleInput={this.handleInput}
              grade={grade}
              grades={grades}
              subGrades={subGrades}
              subGrade={subGrade}
            />
            <SubjectSelect
              handleInput={this.handleInput}
              grade={grade}
              subject={subject}
              subjects={subjects}
            />
          </div>
          <div className={SubjectStyle.subject_row}>
            <TeacherSelect
              handleInput={this.handleInput}
              teacher={teacher}
              teachers={teachers}
            />
            <button
              className={SubjectStyle.create_class}
              onClick={this.handleSubmit}
            >
              Създай
            </button>
          </div>
          <StudentsList students={students} />
        </div>
      </div>
    );
  }
}

ClassCreateContainer.propTypes = {};

export default ClassCreateContainer;
