import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { handleGetAllUsers } from "../../services/userService";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    let response = await handleGetAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUser: response.users,
        },
        () => {
          console.log("check state", this.state.arrUser);
        }
      );
      console.log("check state 1", this.state.arrUser);
    }
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  render() {
    console.log("check state", this.state.arrUser);
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          test={"abc"}
        />
        <div className="title text-center"> Manage User</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i class="fas fa-plus"></i>
            Add New User
          </button>
        </div>
        <div className="user-table mt-3 mx-2">
          <table>
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUser &&
              arrUser.map((item, index) => {
                console.log("check item", item, index);
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-pencil"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
