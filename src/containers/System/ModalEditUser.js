import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "harcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={"ClassNameModalEditUser"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Edit User </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  disabled
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={this.state.email}
                />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  disabled
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  value={this.state.password}
                />
              </div>
              <div className="col-6 form-group mt-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="FirstName"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  value={this.state.firstName}
                />
              </div>
              <div className="col-6 form-group mt-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="LastName"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  value={this.state.lastName}
                />
              </div>
              <div className="col-12 form-group mt-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary px-3 "
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save Changes
          </button>
          <button className="btn btn-secondary px-3" onClick={this.toggle}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
