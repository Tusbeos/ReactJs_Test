import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal,ModalHeader,ModalBody, ModalFooter, Input, Label, Form, FormGroup,} from 'reactstrap';
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  componentDidMount() {}

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
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={"ClassNameModalUser"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Create A New User </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={this.state.email}
                />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
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
              this.handleAddNewUser();
            }}
          >
            Create User
          </button>
          <button className="btn btn-secondary px-3" onClick={this.toggle}>
            Close
          </button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


