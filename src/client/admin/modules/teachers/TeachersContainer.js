import React from "react";
import axios from "axios";


class UsersContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            teacher: {
                username: "",
                password: ""
            },
            selectedTeacherId: "",
            editModalIsOpen: false,
            removeModalIsOpen: false
        };
    }
    componentDidMount() {
        this.handleGetTeachers();
    }
    handleGetTeachers = () => {
        axios
            .get("http://localhost:5000/teachers/")
            .then(response => {
                console.log("ss", response);
                this.setState({
                    teachers: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };
    handleInput = event => {
        this.setState({
            teacher: { ...this.state.teacher, [event.target.name]: event.target.value }
        });
    };
    handleDeleteTeacher = id => {
        axios
            .delete(`http://localhost:5000/teacher/delete/${id}`)
            .then(() => this.handleGetTeachers());
    };
    handleCloseEditModal = () => {
        this.setState({
            editModalIsOpen: false,
            user: { username: "", password: "" }
        });
    };
    handleOpenEditModal = teacher => {
        this.setState({
            editModalIsOpen: true,
            teacher: teacher,
            selectedTeacherId: teacher._id
        });
    };

    handleEditTeacher = () => {
        const { selectedTeacherId, teacher } = this.state;
        axios
            .put(`http://localhost:5000/teachers/edit/${selectedTeacherId}`, teacher)
            .then(() => this.handleGetTeachers());
        this.setState({ editModalIsOpen: false });
    };
    render() {
        const { users, editModalIsOpen, user } = this.state;
        return (
            <div>

            </div>
        );
    }
}

UsersContainer.propTypes = {};

export default UsersContainer;






