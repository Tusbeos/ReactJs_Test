import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import {
  handleGetAllUsers,
  handleCreateNewUserService,
} from "../../services/userService";
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
    await this.getAllUsersFromReact();
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
  getAllUsersFromReact = async () => {
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
    }
  };
  createNewUser = async (data) => {
    try {
      let response = await handleCreateNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
    console.log("check data from chill", data);
    // alert("call me");
  };

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center"> Manage User</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            Add New User
          </button>
        </div>
        <div className="user-table mt-3 mx-2">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUser &&
                arrUser.map((item, index) => {
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
            </tbody>
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
