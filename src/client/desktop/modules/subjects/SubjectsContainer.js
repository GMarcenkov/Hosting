import React from "react";
import Subjects from "./Subjects.module.css";
import SubjectsTableHeader from "./components/SubjectsTableHeader";
import SubjectsTableRow from "./components/SubjectsTableRow";
import jwt_decode from "jwt-decode";
import axios from "axios";
class SubjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        subjects: []
    };
  }
componentDidMount() {
    this.handleGetSubjects()
}
handleGetSubjects= async ()=>{
  let user = jwt_decode(localStorage.getItem("jwt"));
  let subjects=[]
  let teachers=[]
    let rates=[]

  await  axios
      .get(`http://localhost:5000/rates/user/${user.id}/${this.props.grade}`)
      .then(response => {
        subjects=response.data.subjects
          teachers=response.data.teachers
          rates=response.data.rates
      })
      .catch(function(error) {
      });



 await subjects.map(subject=>{
     rates.map(rate=>{
         if(rate.subjectId===subject._id){
             subject.rate=rate
         }
     })
    teachers.map(teacher=>{
      if(teacher._id===subject.teacherId){
        subject.teacher=teacher
      }
    })
  })
    this.setState({subjects:subjects})
}

  render() {
    const{subjects}=this.state;
    return (
      <div className={Subjects.subjects_container_holder}>
        <div className={Subjects.subjects_container_title}>
          Предмети за учебната 2019/2020 година
        </div>
        <div className={Subjects.subjects_container_title}>
          {/*{schoolYear.grade}. клас*/}
        </div>
        <div className={Subjects.list_container}>
          <table>
            <SubjectsTableHeader />
            <tbody>
            {
              subjects.map(subject=>(
                  <SubjectsTableRow  subject={subject}/>
              ))
            }
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

SubjectsContainer.propTypes = {};

export default SubjectsContainer;
