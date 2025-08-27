import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { handleGetAllUsers } from "../../services/userService";
import "@fortawesome/fontawesome-free/css/all.min.css";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
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

  render() {
    console.log("check state", this.state.arrUser);
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <div className="title text-center"> Manage User</div>
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
