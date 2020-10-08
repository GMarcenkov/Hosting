import React from "react";
import axios from "axios";
import UsersListTable from "./components/userListTable/UsersListTable";
import UserEditModal from "./edit/UserEditModal";

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          user: {
            username: "",
            password: ""
          }
        }
      ],
      user: {
        username: "",
        password: ""
      },
      selectedUserId: "",
      editModalIsOpen: false,
      removeModalIsOpen: false
    };
  }
  componentDidMount() {
    this.handleGetUsers();
  }
  handleGetUsers = () => {
    axios
      .get("http://localhost:5000/users/")
      .then(response => {
        console.log("ss", response);
        this.setState({
          users: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  handleInput = event => {
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value }
    });
  };
  handleDeleteUser = id => {
    axios
      .delete(`http://localhost:5000/users/delete/${id}`)
      .then(() => this.handleGetUsers());
  };
  handleCloseEditModal = () => {
    this.setState({
      editModalIsOpen: false,
      user: { username: "", password: "" }
    });
  };
  handleOpenEditModal = id => {
    const { users } = this.state;
    let user = users.find(user => user._id === id);
    this.setState({
      editModalIsOpen: true,
      user: { username: user.username, password: user.password },
      selectedUserId: user._id
    });
  };

  handleEditUSer = () => {
    const { selectedUserId, user } = this.state;
    axios
      .put(`http://localhost:5000/users/edit/${selectedUserId}`, user)
      .then(() => this.handleGetUsers());
    this.setState({ editModalIsOpen: false });
  };
  render() {
    const { users, editModalIsOpen, user } = this.state;
    return (
      <div>
        <UsersListTable
          users={users}
          deleteUser={this.handleDeleteUser}
          editUser={this.handleOpenEditModal}
        />
        <UserEditModal
          user={user}
          editUser={this.handleEditUSer}
          editModalIsOpen={editModalIsOpen}
          closeModal={this.handleCloseEditModal}
          handleInput={this.handleInput}
        />
      </div>
    );
  }
}

UsersContainer.propTypes = {};

export default UsersContainer;






